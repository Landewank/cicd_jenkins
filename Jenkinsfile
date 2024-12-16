pipeline {
    agent { label 'ubuntu' } // Pastikan Jenkins node/agent memiliki label "ubuntu"

    environment {
        DOCKERHUB_USERNAME = credentials('dockerhub-credentials') // Simpan username DockerHub sebagai credential
        DOCKERHUB_PASSWORD = credentials('dockerhub-credentials') // Simpan password DockerHub sebagai credential
        SERVER_HOST = credentials('server-host') // Server host sebagai credential
        SERVER_USERNAME = credentials('server-username') // Server username sebagai credential
        VPS_PRIVATE_KEY = credentials('vps-private-key') // Simpan private key SSH sebagai credential
        DOCKER_IMAGE = "${DOCKERHUB_USERNAME}/jenkins_lanafatemani:latest"
    }

    stages {
        // Stage 1: Build
        stage('Build') {
            agent { docker { image 'ubuntu:latest' } } // Menggunakan Ubuntu sebagai runner
            environment {
                NODE_VERSION = '20.x'
            }
            steps {
                script {
                    // Step: Install Node.js dan dependencies
                    sh """
                        apt-get update && apt-get install -y curl git npm
                        npm install -g n
                        n ${NODE_VERSION}
                        npm install
                    """

                    // Step: Build aplikasi
                    sh """
                        npm run build
                    """

                    // Step: Login ke DockerHub
                    sh """
                        echo "${DOCKERHUB_PASSWORD}" | docker login -u "${DOCKERHUB_USERNAME}" --password-stdin
                    """

                    // Step: Build Docker image
                    sh """
                        docker build -t ${DOCKER_IMAGE} .
                    """

                    // Step: Push Docker image ke DockerHub
                    sh """
                        docker push ${DOCKER_IMAGE}
                    """
                }
            }
        }

        // Stage 2: Deploy
        stage('Deploy') {
            agent { docker { image 'ubuntu:latest' } } // Menggunakan Ubuntu sebagai runner
            steps {
                script {
                    // Step: SSH ke server dan jalankan perintah Docker
                    sh """
                        ssh -i ${VPS_PRIVATE_KEY} -o StrictHostKeyChecking=no ${SERVER_USERNAME}@${SERVER_HOST} <<EOF
                        docker pull ${DOCKER_IMAGE}
                        docker stop lanafatemani || true
                        docker rm lanafatemani || true
                        docker run -d --name lanafatemani -p 3001:3000 --restart always ${DOCKER_IMAGE}
                        EOF
                    """
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline Completed'
        }
    }
}
