import React, {SyntheticEvent, useEffect, useState} from 'react';
import Layout from "../../components/Layout";
import {Button, TextField} from "@material-ui/core";
import axios from "axios";
import {Redirect} from "react-router-dom";

const ProductForm = (props: any) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (props.match.params.id) {
            (
                async () => {
                    const {data} = await axios.get(`products/${props.match.params.id}`);

                    setTitle(data.title);
                    setDescription(data.description);
                    setImage(data.image);
                    setPrice(data.price);
                }
            )();
        }
    }, [])

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        const data = {
            title,
            description,
            image,
            price
        };

        if (props.match.params.id) {
            await axios.put(`products/${props.match.params.id}`, data);
        } else {
            await axios.post('products', data);
        }

        setRedirect(true);
    }

    if (redirect) {
        return <Redirect to={'/products'}/>;
    }

    return (
        <Layout>
            <form onSubmit={submit}>
                <div className="mb-3">
                    <TextField label="Title"
                               value={title} onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <TextField label="Description" rows={4} multiline
                               value={description} onChange={e => setDescription(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <TextField label="Image"
                               value={image} onChange={e => setImage(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <TextField label="Price" type="number"
                               value={price} onChange={e => setPrice(e.target.value)}
                    />
                </div>
                <Button variant="contained" color="primary" type="submit">Submit</Button>
            </form>
        </Layout>
    );
};

export default ProductForm;
