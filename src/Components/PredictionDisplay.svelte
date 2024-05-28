<script>
    export let predictionResult;
</script>

{#if predictionResult !== undefined}
<p>Your survival prediction: {predictionResult ? 'Survived' : 'Did Not Survive'}</p>
{/if}
  