pipeline {
    agent {
        docker { image 'ubuntu:24.04' } // Menjalankan pipeline dalam Ubuntu 24.04
    }

    environment {
        DOCKER_IMAGE = credentials('docker-image') // Sesuaikan dengan username Anda
        DOCKERHUB_LOGIN = credentials('dockerhub-credentials') // akses docker
        VPS_HOST = credentials('vps-host')  // Simpan host VPS di Jenkins Credentials
        VPS_USERNAME = credentials('vps-username')  // Simpan username VPS di Jenkins Credentials
        VPS_PRIVATE_KEY = credentials('vps-private-key')  // Simpan private key VPS di Jenkins Credentials
    }

    stages {
        stage('Install Dependencies') {
            steps {
                sh '''
                    apt-get update
                    apt-get install -y nodejs npm
                    npm install
                '''
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
                    // Push Docker image ke DockerHub
                    sh 'docker push $DOCKER_IMAGE'
                }
            }
        }

        stage('Deploy to Remote Server') {
            steps {
                script {
                    sshagent([VPS_PRIVATE_KEY]) {
                        sh '''
                            ssh -o StrictHostKeyChecking=no -i $VPS_PRIVATE_KEY $VPS_USERNAME@$VPS_HOST "
                            docker pull $DOCKER_IMAGE &&
                            docker stop lanafatemani || true &&
                            docker rm lanafatemani || true &&
                            docker run -d --name lanafatemani -p 3001:3000 $DOCKER_IMAGE
                            "
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
