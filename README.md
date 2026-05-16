# DevOps Telemetry Pipeline (Mock App Monitoring)

This project uses a simple Node.js mock application that imitates a Point-of-Sale (POS) system. It does not process real payments; instead, it provides a basic user interface with buttons to generate dummy traffic (both successful requests and simulated errors).

The main goal of this project is to demonstrate the **Second Way of DevOps: Feedback Loops**. It shows how to build a real-time observability pipeline that collects metrics, visualizes them, and automatically sends alerts to a Discord channel when things go wrong.

## 🏗️ Architecture

![System Architecture](/app/architecture.png)

The environment is built using four Docker containers:
* **Mock POS App (Node.js):** Generates dummy traffic and exposes telemetry data.
* **Prometheus:** Pulls the metrics from the app and evaluates math rules (like error rates).
* **Grafana:** Creates the visual dashboards (Visual Feedback).
* **Alertmanager:** Sends automated messages to Discord when an alert fires (Active Feedback).

## 🚀 Getting Started

### Prerequisites
* [Docker](https://www.docker.com/) and Docker Compose installed.
* A Discord Webhook URL for the alerts.

## 🚀 How to Run the Project (Docker)

To run this project, you only need to have **Docker** and **Docker Compose** installed on your machine. No need to install Node.js locally.

**Step 1: Download and enter the project folder**
First, clone the repository to your local machine and navigate into the folder:
```bash
git clone [https://github.com/your-username/devops-pos-monitoring.git](https://github.com/your-username/devops-pos-monitoring.git)
cd devops-pos-monitoring
```
**Step 2: Configure the Discord Webhook**

To receive real-time incident notifications through Discord:

1. Open the `alertmanager.yml` file in your preferred code editor.
2. Locate the webhook URL field.
3. Replace the placeholder URL with your own **Discord Webhook URL**.

> 💡 This step enables Alertmanager to send notifications directly to your Discord channel.

---

## Step 3: Start the Environment

Run the following command to build the Node.js application and start all services in the background:

```bash
docker-compose up -d --build
