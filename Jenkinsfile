pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building..'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
        stage('Performance Tests') {
  agent {
    label 'main'
  }
  when {
    branch 'main'
  }
  steps {
    deleteDir()
    checkout scm
    sh 'npm install'
    sh 'npm run lighthouse'
  }
  post {
    always {
      publishHTML (target: [
        allowMissing: false,
        alwaysLinkToLastBuild: false,
        keepAll: true,
        reportDir: '.',
        reportFiles: 'lighthouse-report.html',
        reportName: "Lighthouse"
      ])
    }
  }
}
    }
}
