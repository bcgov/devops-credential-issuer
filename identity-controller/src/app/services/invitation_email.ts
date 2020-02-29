export const emailTemplate = (url: string, adminAddress: string) => {
  return `<p>
  You have received this invitation from ${adminAddress}. If you have any
  questions please contact them by sending an email to <a href="mailto:${adminAddress}">${adminAddress}</a>. 
  </p>
  <p>
  Following this process you will receive a BCDevOps Verifiable credential that will provide you
  with access to a number of online services.
  </p>
  <p>
  There are three steps:
  </p>
  <ol>
  <li>Setup by installing a mobile app (personal agent) and completing other prerequisite activities
  <li>Obtain your proof of concept digital for a verified person from the BC DevOps issuing service
  <li>Use your digital ID at one or more of the services supporting this type of authentication
  </li>
  </ol>
  <p>
  Step 1: Setup
  </p>
  <ol>
  <li>Install a smartphone app that you will use as your personal agent for
  receiving, holding, and sharing verifiable credentials that are issued to you.
  Please install one of the following: 
  <ol>    
  <li>Streetcred, for iOS and Android. Please make special note of
  the extra details for this step since the demo will not work unless you follow
  the app setup instructions <a href="https://github.com/bcgov/identity-kit-poc/blob/master/docs/GettingApp.md">here</a>.
  <li>Other agents are TBD and are expected to be created by POC participants.
  </li> 
  </ol>
  </li> 
  </ol>
  <p>
  Step 2: Obtain your BC DevOps Verifiable Credential
  </p>
  <p>
  This step works best if you have an additional device such as a laptop
  or tablet that can display the screens for the issuing service.
  <b>Using your laptop or tablet click the following link to
  start the process for issuing your BC DevOps Verifiable credential:</b>
  </p>
  <p><b><a href="${url}">${url}</a></b></p>
  <p>
  Step 3: Use your proof of concept digital ID at proof of concept demonstration services. 
  </p>
  <p>
  Currently the following services are available:
  </p>
  <p>
  We have found it works best if you use a second device such as a laptop
  or tablet for running these demo services. Please close and restart your
  browser to be sure that the github login is cleared away before running
  the demo services.
  </p>
  <ol>
  <li>T.B.D.</li>
  </ol>`;
};
