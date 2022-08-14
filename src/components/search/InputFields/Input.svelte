<script lang="ts">
    import InputWrapper from "./InputWrapper.svelte";
    import GenericInput from "./GenericInput.svelte";
    import DateInput from "./DateInput.svelte";

    export let label: string;
    export let name: string;
    export let id: string;
    export let errors: string[] = [];
    export let hint: string = '';
    export let autocomplete: string;
    export let type: string = 'text';
    export let optional: boolean = false;

    export let value;
</script>

<InputWrapper {id} {label} {autocomplete} {optional} {errors} {hint}>
    {#if type === 'date'}
    <DateInput {id} {name} {optional} {autocomplete} bind:value={value} />
        {:else}
        <GenericInput {id} {name} {optional} {autocomplete} {type} bind:value={value} />
        {/if}
    <slot></slot>
</InputWrapper>
