<script lang="ts">
    export let name: string;
    export let id: string;
    export let autocomplete: string;
    export let type: string = 'text';
    export let optional: boolean = false;

    export let value;

    const handleInput = (event: InputEvent) => {
        // in here, you can switch on type and implement
        // whatever behaviour you need
        const target = event.target as HTMLInputElement

        if (type.match(/^(number|range)$/)) {
            value = +target.value
        }
        value = target.value
    }

</script>


<input class="input"
       id={id}
       name={name}
       aria-required={!optional}
       autocomplete={autocomplete}
       type={type}
       value={value}
       on:input={handleInput}
>
