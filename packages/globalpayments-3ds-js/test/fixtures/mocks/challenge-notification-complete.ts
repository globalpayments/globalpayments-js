export default `<script>
  if (window.parent !== window) {
    window.parent.postMessage({
      event: 'challengeNotification',
      data: {
        acsTransID: '3ad375c8-4380-4ba5-bda1-7cc9cc1a2cf1',
        challengeCompletionInd: 'Y',
        messageType: 'CRes',
        messageVersion: '2.1.0',
        threeDSServerTransID: '6d0e33f4-0084-406c-b7a9-765b5f052936',
        transStatus: 'N',
      }
    }, window.location.origin);
  }
</script>`;
