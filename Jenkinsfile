pipeline {
   agent {
        docker {
            image 'ubuntu:24.04' // Menggunakan image Ubuntu 24.04
            args '-v /var/run/docker.sock:/var/run/docker.sock' // Opsional jika butuh akses Docker daemon
        }
    }

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
                script {
                    sh '''
                        echo "Running on Ubuntu 24.04"
                        cat /etc/os-release
                    '''
                }
            }
        }
        stage('Deploy') {
            steps {
                echo 'test'
            }
        }
    }
}
