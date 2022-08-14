<script lang="ts">
    export let label: string;
    export let id: string;
    export let errors: string[] = [];
    export let hint: string = '';
    export let optional: boolean = false;

</script>

<div class="input-field">
    <label for={id} class="stack">
        <span class="input-label">{label} {#if optional}(optional){/if}</span>
        {#if hint}<span class="input-hint">{hint}</span>{/if}
        {#if errors?.length > 0}
        {#each errors as error}
            <span class="input-error">{error}</span>
        {/each}
        {/if}
    </label>
    <div class="cluster"><slot></slot></div>
</div>
