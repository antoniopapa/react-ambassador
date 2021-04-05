import React, {useEffect, useState} from 'react';
import Layout from "../components/Layout";
import Products from "./Products";
import {Product} from "../models/product";
import axios from "axios";
import {Filters} from "../models/filters";

const ProductsFrontend = () => {
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [filters, setFilters] = useState<Filters>({
        s: '',
        sort: '',
        page: 1
    });
    const [lastPage, setLastPage] = useState(0);
    const perPage = 9;

    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get('products/frontend');

                setAllProducts(data);
                setFilteredProducts(data);
                setLastPage(Math.ceil(data.length / perPage));
            }
        )()
    }, []);

    useEffect(() => {
        let products = allProducts.filter(p => p.title.toLowerCase().indexOf(filters.s.toLowerCase()) >= 0 ||
            p.description.toLowerCase().indexOf(filters.s.toLowerCase()) >= 0)

        if (filters.sort === 'asc') {
            products.sort((a, b) => {
                if (a.price > b.price) {
                    return 1;
                }

                if (a.price < b.price) {
                    return -1;
                }

                return 0;
            })
        } else if (filters.sort === 'desc') {
            products.sort((a, b) => {
                if (a.price > b.price) {
                    return -1;
                }

                if (a.price < b.price) {
                    return 1;
                }

                return 0;
            })
        }
        console.log(filters.page * perPage);
        setLastPage(Math.ceil(products.length / perPage));
        setFilteredProducts(products.slice(0, filters.page * perPage));
    }, [filters]);

    return (
        <Layout>
            <Products products={filteredProducts} filters={filters} setFilters={setFilters} lastPage={lastPage}/>
        </Layout>
    );
};

export default ProductsFrontend;
