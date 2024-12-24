pipeline {
    //    agent {
    //     docker { 
    //         image 'ubuntu:24.04'
    //         args '-u root'
    //     }
    //    }
    
    agent any // 

    tools {
        nodejs 'nodejs' // Sesuaikan dengan nama NodeJS di Global Tool Configuration (ini digunakan kalau angent any)
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
                    # Install dependencies dan build project menggunakan Node.js dari Jenkins
                    npm install
                    npm run build
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
    
    }

    post {
        always {
            cleanWs()
        }
    }
}
