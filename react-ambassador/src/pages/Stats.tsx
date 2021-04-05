import React, {useEffect, useState} from 'react';
import axios from "axios";
import Layout from "../components/Layout";

const Stats = () => {
    const [stats, setStats] = useState([]);

    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get('stats');

                setStats(data);
            }
        )();
    }, []);
    return (
        <Layout>
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Revenue</th>
                    </tr>
                    </thead>
                    <tbody>
                    {stats.map((s: { code: string, revenue: number }, index) => {
                        return (
                            <tr key={index}>
                                <td>{`http://localhost:5000/${s.code}`}</td>
                                <td>{s.code}</td>
                                <td>{s.revenue}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
};

export default Stats;
