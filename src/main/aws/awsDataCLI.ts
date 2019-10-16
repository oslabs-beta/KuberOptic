// This allows to write CLI Bash commands in our scripts. 
const util = require('util')
const exec = util.promisify(require('child_process').exec);

// This object will store the aws data entered when they begin the app

  // Call this function whenever you want to run a command in the CLI;
   async function runCommand(command: String, callback: Function){
     await exec(command, function(error: String, stdout: String, stderr: String) {
      if (error) console.log(error, stderr)
      console.log('stdout' , stdout)
      // callback(stdout);
      })
  }
  /* This command is used to test wheethter the CLI responds with a prompt for more information. 
  Use this whenever you need to respond to any prompts */
  const respondCommand = (command: String) => {
    return exec(command, function(error: String, stdout: String, stderr: String) {
      if (error) console.log(error, stderr)
      console.log(stdout);
    })
  }
  
  /* This is the first CLI command that needs to run,  because is configures a user machine to use AWS
  It will ask for four prompts the AWS Key, Secret, and Format */ 
  // In this case awsConfigure becomes an object with a series of keys that can be accessed.
  const awsConfigure = respondCommand('aws configure'); 
  
  /* These are used to write to the Stdin key on the awsConfigure Object, 
  which respond to the prompts needed to properly configure the machine. */
  // awsConfigure.stdin.write(awsInfo.awsKey);
  // awsConfigure.stdin.write(awsInfo.awsSecret);
  // awsConfigure.stdin.write("us-east-1");
  // awsConfigure.stdin.write('json');
  
  /*This information is configured in the AWS Console. 
  It is called a VPC stack. The user must currently already have configured a VPC stack 
  to deploy a cluster thorugh the application. 
  <-------------------------------------------->
  VPC Configuration Data
  sg-00b65d65fb3c67cc7 
  subnet-0af1a965b1a5ec4da, subnet-003c64142f3d08046, subnet-07af232880f4ad84b
  vpc-0baf1b99ffb8f0418
  <--------------------------------------------> /*
  
  /* This is the text needed to create a cluster. 
  If we implement the ability to configure IAM arn, roles, and vpc stack
  then we will have to store that information in objects 
  and use template literals to add that user data to the string. */
  // const createClusterText: String = 'aws eks create-cluster --name TestKubernati \
  // --role-arn arn:aws:iam::467094939373:role/eksServiceRole --resources-vpc-config subnetIds=subnet-003c64142f3d08046,subnet-003c64142f3d08046,subnet-07af232880f4ad84b,securityGroupIds=sg-00b65d65fb3c67cc7';
  
  // This desployes the cluster using the createClusterText and logs the response. 
  // const deployCluster: void = runCommand(createClusterText, (data: String) => console.log(data))
  
  /*This describes the data. We will need to either have the user enter a name of a cluster they want to visualize 
  or we will ahve to find a way to see already deployed clusters. */
  
  // const describeCluster: void = runCommand(`aws eks describe-cluster --name ${awsInfo.clusterName}`, 
  // (data: String) => console.log(data));
  runCommand(`aws eks describe-cluster --name ${awsInfo.clusterName}`, (data: String) => {
    console.log('hello')
  })
  // console.log("dog: ", dog)

// quickstart()