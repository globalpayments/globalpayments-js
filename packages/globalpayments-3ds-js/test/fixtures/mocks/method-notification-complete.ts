export default `<script>
  if (window.parent !== window) {
    window.parent.postMessage({
      event: 'methodNotification',
      data: {
        threeDSServerTransID: '6d0e33f4-0084-406c-b7a9-765b5f052936',
      }
    }, 'http://localhost:7778');
  }
</script>`;
