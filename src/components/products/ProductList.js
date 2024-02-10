import ProductCard from './ProductCard';
import { useEffect, useState, } from 'react';
import { Col, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true); // State variable to track loading state

    const url = `${process.env.REACT_APP_API_URL}/products/`;
    const options = {
        method: "GET",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url, options);
                const data = await response.json();
                setProducts(data)
                setLoading(false); // Set loading to false once data is fetched

            } catch(error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();

        // Cleanup function (optional)
        return () => {
            // Cleanup code here if needed
        };

    }, []); // Empty dependency array means this effect runs only once after the initial render


    const productList = products.map(product => {
                            return (
                                <Col md={4}>
                                    <ProductCard productProp={product} key={product._id} />
                                </Col>
                            );
                        });

    return (
        <>
            {loading ? ( // Check loading state, if true, show loading animation
            <div className='d-flex justify-content-center align-items-center'>
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div>
            ) : (
                <>{productList}</> // Once data is loaded, show product list
            )}
        </>
    )
}

export default ProductList