import React, {useState} from 'react';
import {Product} from "../models/product";
import {Filters} from "../models/filters";
import axios from "axios";

const Products = (props: {
    products: Product[],
    filters: Filters,
    setFilters: (filters: Filters) => void,
    lastPage: number
}) => {
    const [selected, setSelected] = useState<number[]>([]);
    const [notify, setNotify] = useState({
        show: false,
        error: false,
        message: ''
    });

    const search = (s: string) => {
        props.setFilters({
            ...props.filters,
            page: 1,
            s
        });
    }

    const sort = (sort: string) => {
        props.setFilters({
            ...props.filters,
            page: 1,
            sort
        })
    }

    const load = () => {
        props.setFilters({
            ...props.filters,
            page: props.filters.page + 1
        })
    }

    const select = (id: number) => {
        if (selected.some(s => s === id)) {
            setSelected(selected.filter(s => s !== id));
            return;
        }

        setSelected([...selected, id]);
    }

    const generate = async () => {
        try {
            const {data} = await axios.post('links', {
                products: selected
            });

            setNotify({
                show: true,
                error: false,
                message: `Link generated: http://localhost:5000/${data.code}`
            });
        } catch (e) {
            setNotify({
                show: true,
                error: true,
                message: 'You should be logged in to generate a link!'
            })
        } finally {
            setTimeout(() => {
                setNotify({
                    show: false,
                    error: false,
                    message: ''
                })
            }, 3000);
        }
    }

    let button;

    if (props.filters.page != props.lastPage) {
        button = (
            <div className="d-flex justify-content-center mt-4">
                <button className="btn btn-primary" onClick={load}>Load More</button>
            </div>
        )
    }

    let generateButton, info;

    if (selected.length > 0) {
        generateButton = (
            <div className="input-group-append">
                <button className="btn btn-info" onClick={generate}>Generate Link</button>
            </div>
        )
    }

    if (notify.show) {
        info = (
            <div className="col-md-12 mb-4">
                <div className={notify.error ? "alert alert-danger" : "alert alert-info"} role="alert">
                    {notify.message}
                </div>
            </div>
        )
    }

    return (
        <>
            {info}

            <div className="col-md-12 mb-4 input-group">
                <input type="text" className="form-control" placeholder="Search"
                       onChange={e => search(e.target.value)}
                />
                {generateButton}
                <div className="input-group-append">
                    <select className="form-select" onChange={e => sort(e.target.value)}>
                        <option>Select</option>
                        <option value="asc">Price Ascending</option>
                        <option value="desc">Price Descending</option>
                    </select>
                </div>
            </div>

            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                {props.products.map(product => {
                    return (
                        <div className="col" key={product.id} onClick={() => select(product.id)}>
                            <div
                                className={selected.some(s => s === product.id) ? "card shadow-sm selected" : "card shadow-sm"}>
                                <img src={product.image} height={200}/>

                                <div className="card-body">
                                    <p className="card-text">{product.title}</p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <small className="text-muted">${product.price}</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {button}
        </>
    );
};

export default Products;
