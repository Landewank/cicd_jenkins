pipeline {
   agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials') // Simpan username DockerHub sebagai credential
        VPS_PRIVATE_KEY = credentials('vps-private-key') // Simpan private key SSH sebagai credential
        DOCKERHUB_USERNAME = credentials('docker-username') // simpan username dockerhub
        REGISTRY_IMAGE = credentials('image-registry') //repository image di docker hub
        SERVER_HOST = credentials('server-host') // IP Server host sebagai credential
        SERVER_USERNAME = credentials('server-username') // Server username sebagai credential
    }

    stages {
        stage('Build') {
            steps {
                sh 'docker --version'
            }
        }
    }
}
