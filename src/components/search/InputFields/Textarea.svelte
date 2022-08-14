<script lang="ts">
    import InputWrapper from "./InputWrapper.svelte";

    export let label: string;
    export let name: string;
    export let id: string;
    export let errors: string[] = [];
    export let hint: string = '';
    export let optional: boolean = false;
    export let splitLines: boolean = false;

    export let value;

    const handleInput = (event: InputEvent) => {
        // in here, you can switch on type and implement
        // whatever behaviour you need
        const target = event.target as HTMLInputElement
        if (splitLines) {
            value = target.value.split('\n');
        }
    }

</script>

<InputWrapper {id} {label} {optional} {errors} {hint}>
    <textarea class="input textarea" id={id}
           name={name}
           aria-required={!optional}
           value={splitLines ? value.join("\n") : value}
           on:input={handleInput}
    ></textarea>
    <slot></slot>
</InputWrapper>
