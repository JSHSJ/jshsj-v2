<script lang="ts">
    export let name: string;
    export let id: string;
    export let autocomplete: string;
    export let optional: boolean = false;

    export let value;

    $: internalValue = formatForDate(value)

    const handleInput = (event: InputEvent) => {
        // in here, you can switch on type and implement
        // whatever behaviour you need
        const target = event.target as HTMLInputElement

        value = new Date(target.value)
    }

    const formatDate = (date: Date) => {
        return date.toISOString().substring(0, 10)
    }

    const formatForDate = (value: string | Date) => {
        const parsedDate = new Date(value);
        // Means it's invalid. Return a new one.
        if (parsedDate.toString() === 'Invalid Date') {
            return formatDate(new Date())
        }
        return formatDate(parsedDate)
    }

    const setToday = () => {
        value = new Date()
    }

</script>


<input class="input"
       id={id}
       name={name}
       aria-required={!optional}
       autocomplete={autocomplete}
       type={'date'}
       value={internalValue}
       on:input={handleInput}
>
<button type="button" class="CTA-button" on:click={setToday}>
    Heute
</button>


