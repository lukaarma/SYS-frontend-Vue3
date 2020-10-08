<template>
    <h1>
        This is a page of counters. There are currently
        {{ counters.length }} counters
    </h1>

    <div
        class="counter"
        v-for="counter of counters"
        v-bind:key="counter.id"
        style="margin: 20px 0px"
    >
        <h3 style="display: inline; margin: 0px 20px 0px 0px">
            {{ counter.value.value }}
        </h3>
        <input type="number" name="delta" id="delta" v-model.number="delta" />
        <button @click="increment(counter, delta)">increment me</button>
    </div>

    <input type="number" name="delta" id="delta" v-model.number="test" />
    <button @click="addCounter(test)">increment me</button>
</template>


<script lang="ts">
import { defineComponent, ref } from "vue";

type Counter = {
    id: number;
    value: number;
};

export default defineComponent({
    name: "CounterButton",
    setup() {

        let i = 0;
        const startValues = [1, 5, 3];
        const counters = startValues.map((item) => {
            return ref({
                id: i++,
                value: item,
            });
        });

        function increment(counter: Counter, delta: number) {
            console.log(delta);
            counter.value += delta;
        }

        function addCounter(startValue?: number) {
            console.log(startValue);

            counters.push(ref({
                id: i++,
                value: startValue ?? 0,
            })
            );
        }

        return {
            counters,
            increment,
            addCounter,
        };
    }
});
</script>
