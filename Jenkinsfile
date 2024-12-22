pipeline {
    agent any

    environment {
        DOCKER_IMAGE = credentials('docker-image') // Sesuaikan dengan username Anda
        DOCKERHUB_LOGIN = credentials('dockerhub-credentials')
        VPS_HOST = credentials('vps-host')  // Simpan host VPS di Jenkins Credentials
        VPS_USERNAME = credentials('vps-username')  // Simpan username VPS di Jenkins Credentials
        VPS_PRIVATE_KEY = credentials('vps-private-key')  // Simpan private key VPS di Jenkins Credentials
    }

    stages {
        stage('Install Dependencies') {
            agent {
                docker { image 'node:23.4-alpine3.21' }
            }
            steps {
                checkout scm  // Checkout repository
                sh 'npm install'  // Install dependencies
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Login ke DockerHub
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKERHUB_USERNAME', passwordVariable: 'DOCKERHUB_PASSWORD')]) {
                        sh 'echo $DOCKERHUB_PASSWORD | docker login -u $DOCKERHUB_USERNAME --password-stdin'
                    }
                    // Build Docker image
                    sh 'docker build -t $DOCKER_IMAGE .'
                    // Tampilkan Docker image untuk memastikan
                    sh 'docker images'
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    // Push Docker image ke DockerHub
                    sh 'docker push $DOCKER_IMAGE'
                }
            }
        }

        stage('Deploy to Remote Server') {
            steps {
                script {
                    // Install SSH Client dan melakukan deploy menggunakan SSH
                    sshagent([VPS_PRIVATE_KEY]) {
                        sh '''
                            sudo docker pull $DOCKER_IMAGE
                            sudo docker stop lanafatemani || true
                            sudo docker rm lanafatemani || true
                            sudo docker run -d --name lanafatemani -p 3001:3000 $DOCKER_IMAGE
                        '''
                    }
                }
            }
        }
    }
    
    post {
        always {
            cleanWs()  // Membersihkan workspace setelah pipeline selesai
        }
    }
}
