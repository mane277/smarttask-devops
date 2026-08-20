pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-creds')
        DOCKERHUB_USER = "manemariama"
        IMAGE_TAG = "${env.BRANCH_NAME}-${env.BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build images') {
            steps {
                sh 'docker build -t $DOCKERHUB_USER/smarttask-backend:$IMAGE_TAG ./backend'
                sh 'docker build -t $DOCKERHUB_USER/smarttask-frontend:$IMAGE_TAG ./frontend'
            }
        }

        stage('Login Docker Hub') {
            steps {
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
            }
        }

        stage('Push images') {
            steps {
                sh 'docker push $DOCKERHUB_USER/smarttask-backend:$IMAGE_TAG'
                sh 'docker push $DOCKERHUB_USER/smarttask-frontend:$IMAGE_TAG'
            }
        }
    }

    post {
        success {
            echo "Pipeline réussi - images publiées avec le tag ${IMAGE_TAG}"
        }
        failure {
            echo "Le pipeline a échoué - voir les logs ci-dessus"
        }
        always {
            sh 'docker logout || true'
        }
    }
}
