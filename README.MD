# KuberOptic
### 
kuberoptic.com
***
![](src/client/assets/credsPage/MainKuberOpticGif.gif)
### A visualization and deployment tool for your Kubernetes cluster
###

KuberOptic provides a tool that allows developers to visualize the structure of their clusters, including the nodes, pods, and containers. At each level of a cluster, KuberOptic gives you monitoring analytics that describe the health of your application. KuberOptic also allows you to deploy new clusters onto the cloud.

***
## How to Use:

### Local Deployment of Kubernetes
First we need a cluster to visualize. We could use minikube to set up a simple cluster. This api will automatically scan for whether a cluster is deployed locally and visualize it.

[Kubernetes Documentation](https://kubernetes.io/docs/tasks/tools/install-minikube/)
***
### Reading clusters from cloud services
***
### GCP
First create a google developer account for Google Cloud Platform (GCP) and start a project through GCP. Find your credentials on Google and then enter them with the corresponding time zone on the upload page. The credentials you get from Google should be in a JSON in the form of GOOGLE_APPLICATION_credentials. Your deployed cluster through GCP will now be visualized in real time.
**Prequisites**
- Google Developer account for Google Cloud Platform (GCP - https://cloud.google.com/)
- Create a project on GCP

**Configuring GCP through command line**
```
gcloud auth application-default login
```
#### Input Project credentials
AWS - Requires Access Key and Secret Key

![](https://media.giphy.com/media/fwzZ6dbJvqKDJxpyBh/giphy.gif)

GCP - Requires JSON object with Project_ID

![](https://media.giphy.com/media/Ws3EjFrutxn3YHR3In/giphy.gif)

***
#### Deployment (GCP) 
![](https://media.giphy.com/media/Y1M2Gynz25sCdQOqtp/giphy.gif)
***
### AWS
Our API utilizes AWS-SDK's EKS(Amazon Elastic Kubernetes Service). Simply go and create an AWS account to generate a secret ID and SecretKey for your IAM account. Enter the Secret ID and Key to enter the display/deploy page.

You can choose to display by name or by region. 

To display by region, choose the region from the drop-down menu and press the submit button. To display by name, enter the cluster name (or names, separated by commas) and press submit. Your deployed clusters will no be visualized in real time. 

You can also choose to remove individual or multiple clusters from the display without deleting them from the cloud. Just enter the name(s) of the clusters you wish to remove and click "Remove Cluster."

To deploy a new cluster, enter the name of the new cluster, your roleARN, two subnet IDs, and the region in which you wish to deploy, then click "Deploy Cluster." Please note that it will take a few minutes for your cluster to be created, at which point you can retrieve it for display. 

To delete a cluster from the cloud, enter the name and region of the cluster you wish to delete (you don't need the roleARN or Subnet IDs) and click "Delete Cluster." As with deploying, it will take a few minutes for your changes to take effect.  
![](https://media.giphy.com/media/Y4D7nv61sLnOI9Kajc/giphy.gif)
***
### Azure
**COMING SOON**
***
**Build project with Webpack**
```
npm run prod
```
**Run in production environment**
```
cd dist
npm start
```
**Run tests with Jest**
```
npm run test
```
**Build package and create installer for mac OS**
```
npm run prod
npm run package-mac
npm create-installer-mac
```
**Lint project**
```
npm run lint
```
## Coming Soon
**Stretch Features**
- Deployment to Azure
- Remodeled UI
***
## Authors
[Bryan Villafuerte](https://github.com/BryV38) - [Darren Napier](https://github.com/darrenNapier)

[Dominic Ameneyro](https://github.com/dameneyro) - [Jacob Banks](https://github.com/jacobbanks)

[Jay Dawson](https://github.com/ImJustJay) - [Juan Espinoza](https://github.com/jespinoza17)

[Jimmy Deng](https://github.com/rev619) - [Timothy Mai](https://github.com/tqmai)
## License
MIT
