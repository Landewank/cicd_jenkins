pipeline {
    agent {
        docker {
            image 'ubuntu:24.04'
            args '-u root' // Menjalankan sebagai user root
        }
    }

    environment {
        DOCKER_IMAGE = credentials('docker-image')
        DOCKERHUB_LOGIN = credentials('dockerhub-credentials')
        VPS_HOST = credentials('vps-host')
        VPS_USERNAME = credentials('vps-username')
        VPS_PRIVATE_KEY = credentials('vps-private-key')
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
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKERHUB_USERNAME', passwordVariable: 'DOCKERHUB_PASSWORD')]) {
                        sh 'echo $DOCKERHUB_PASSWORD | docker login -u $DOCKERHUB_USERNAME --password-stdin'
                    }
                    sh 'docker build -t $DOCKER_IMAGE .'
                    sh 'docker images'
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
            cleanWs()
        }
    }
}
