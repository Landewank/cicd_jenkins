pipeline {
    agent {
        docker { 
            image 'ubuntu:24.04'
            args '-u root'
        }
    }
    // agent any // 

    // tools {
    //     nodejs 'nodejs' // Sesuaikan dengan nama NodeJS di Global Tool Configuration (ini digunakan kalau angent any)
    // }

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
                    # Update package list
                    apt-get update
                    apt-get install -y curl

                    # Install Node.js 23.5.0 from NodeSource
                    curl -sL https://deb.nodesource.com/setup_23.x | bash -
                    apt-get install -y nodejs

                    # Verifikasi versi Node.js dan npm
                    node --version
                    npm --version

                    # Install project dependencies
                    npm install
                '''
            }
        }

        stage('Build Docker Image') {
            agent {
                docker {
                    image 'docker:20.10-dind'  // Ganti dengan image Docker yang mendukung DinD
                    args '--privileged'  // Menjalankan container dengan hak istimewa
                }
            }
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

        // stage('Deploy to Remote Server') {
        //     steps {
        //         script {
        //             sshagent([VPS_PRIVATE_KEY]) {
        //                 sh '''
        //                     ssh -o StrictHostKeyChecking=no -i $VPS_PRIVATE_KEY $VPS_USERNAME@$VPS_HOST "
        //                     docker pull $DOCKER_IMAGE &&
        //                     docker stop lanafatemani || true &&
        //                     docker rm lanafatemani || true &&
        //                     docker run -d --name lanafatemani -p 3001:3000 $DOCKER_IMAGE
        //                     "
        //                 '''
        //             }
        //         }
        //     }
        // }
    }

    post {
        always {
            cleanWs()
        }
    }
}
