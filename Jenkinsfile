pipeline {
    agent { docker { image 'node:20' } } // Menggunakan image Node.js resmi versi 20

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
        VPS_PRIVATE_KEY = credentials('vps-private-key')
        DOCKERHUB_USERNAME = credentials('docker-username')
        REGISTRY_IMAGE = credentials('image-registry')
        SERVER_HOST = credentials('server-host')
        SERVER_USERNAME = credentials('server-username')
    }

    stages {
        stage('Build and Push Docker Image') {
            steps {
                script {
                    // Install dependencies dan build aplikasi
                    sh """
                        echo "Building Application..."
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
