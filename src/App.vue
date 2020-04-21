<template>
    <div id="app">
        <h1>"Searching cities in the world"</h1>
        <div class="input-group input-group-lg bottom">
            <div class="input-group-prepend">
                <span class="input-group-text">Search</span>
            </div>
            <input type="text" class="form-control col-md-12" v-model="query" @keyup.prevent="search">
        </div>
        <div class="row" v-if="results">
            <!--always add index after element otherwise type not found error../-->
            <div class="col-md-3" v-for="(result,index) in results" :key="index">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <!-- display the city name and country  -->
                        {{ result._source.name }}, {{ result._source.country }}
                    </div>
                    <div class="panel-body">
                        <!-- display the latitude and longitude of the city  -->
                        <p>lat:{{ result._source.lat }}, long: {{ result._source.lng }}.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        data: function () {
            return {
                results: [],
                query: "",
                loadingResults: false
            }
        },
        methods: {
            search: function () {
                this.loadingResults = true;
                axios.get("http://localhost:5000/search?q=" + this.query)
                    .then(response => {
                        console.log(response.data);
                        this.results = response.data;
                        this.loadingResults = false;
                    });
            }
        }/*,
        watch: {
            query: function () {
                this.search();
            }
        }*/
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

    h3 {
        margin: 40px 0 0;
    }

    .search-form .form-group {
        float: right !important;
        transition: all 0.35s, border-radius 0s;
        width: 32px;
        height: 32px;
        background-color: #fff;
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset;
        border-radius: 25px;
        border: 1px solid #ccc;
    }

    .search-form .form-group input.form-control {
        padding-right: 20px;
        border: 0 none;
        background: transparent;
        box-shadow: none;
        display: block;
    }

    .search-form .form-group input.form-control::-webkit-input-placeholder {
        display: none;
    }

    .search-form .form-group input.form-control:-moz-placeholder {
        /* Firefox 18- */
        display: none;
    }

    .search-form .form-group input.form-control::-moz-placeholder {
        /* Firefox 19+ */
        display: none;
    }

    .search-form .form-group input.form-control:-ms-input-placeholder {
        display: none;
    }

    .search-form .form-group:hover,
    .search-form .form-group.hover {
        width: 100%;
        border-radius: 4px 25px 25px 4px;
    }

    .search-form .form-group span.form-control-feedback {
        position: absolute;
        top: -1px;
        right: -2px;
        z-index: 2;
        display: block;
        width: 34px;
        height: 34px;
        line-height: 34px;
        text-align: center;
        color: #3596e0;
        left: initial;
        font-size: 14px;
    }
</style>
