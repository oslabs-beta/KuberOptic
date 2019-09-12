# KuberOptic

![](src/client/assets/credsPage/kub.png)

### A visualization and deployment tool for your Kubernetes cluster

KuberOptic provides a tool that lets you visualize a Kafka cluster and allows developers to easily deploy a cluster to the cloud.

***

## How to Use:
***
### GCP
![Screen Capture](src/client/assets/credsPage/google.png)
***
First create a google developer account and start a project through GCP. Find your credentials on Google and then enter them with the corresponding time zone on the upload page. Your deployed cluster through GCP will now be visualized in real time.

**Prequisites**
- Google Developer account
- create a project on GCP

**Configuring GCP through command line**
```
gcloud --rest of command--
```
**Input Project credentials**
```
insert a gif of user entering credentials here
```
***
### AWS
**Enter AWS configuration/set-up here**
![Screen Capture](src/client/assets/credsPage/aws.png)

***
### Azure
**COMING SOON**
![Screen Capture](src/client/assets/credsPage/azure.png)

### Scripts break-down

**Run in production environment**
```
npm start
```

**Build package for mac OS***
```
npm run build:mac
```
**Build package for linux***
```
npm run build:linux
```

**Lint project**
```
npm run lint
```

***

## Authors

[Juan Espinoza](https://github.com/jespinoza17)

[Jacob Banks](https://github.com/jacobbanks)

[Jay Dawson](https://github.com/ImJustJay)

[Jimmy Deng](https://github.com/rev619)

## License
MIT
