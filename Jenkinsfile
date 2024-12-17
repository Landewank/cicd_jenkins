pipeline {
    agent any // Menggunakan Jenkins default agent

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials') // Simpan username DockerHub sebagai credential
        VPS_PRIVATE_KEY = credentials('vps-private-key') // Simpan private key SSH sebagai credential
        DOCKERHUB_USERNAME = credentials('docker-username') // simpan username dockerhub
        REGISTRY_IMAGE = credentials('image-registry') //repository image di docker hub
        SERVER_HOST = credentials('server-host') // IP Server host sebagai credential
        SERVER_USERNAME = credentials('server-username') // Server username sebagai credential
    }

    stages {
        // Stage 1: Build dan Push Docker Image
        stage('Build and Push Docker Image') {
            steps {
                script {
                    // Install sudo, dependencies dan build aplikasi
                    sh """
                        echo "Installing sudo and building Application..."
                        apt-get update && apt-get install -y sudo curl git npm
                        curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
                        apt-get install -y nodejs
                        npm install
                        npm run build
                    """

                    // Login ke DockerHub
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        sh """
                            echo ${DOCKER_PASS} | docker login -u ${DOCKER_USER} --password-stdin
                        """
                    }

                    // Build Docker Image dan Push ke DockerHub
                    sh """
                        docker build -t ${DOCKER_USER}/${REGISTRY_IMAGE} .
                        docker push ${DOCKER_USER}/${REGISTRY_IMAGE}
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
