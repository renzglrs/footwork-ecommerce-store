import { useState, useEffect, useContext } from "react";
import UserContext from "../UserContext";
import AdminView from "../components/AdminView";
import UserView from "../components/UserView";

const ProductPage = () => {
    document.title = "Products";

    const { user } = useContext(UserContext);
    const [products, setProducts] = useState([]);

    console.log(user)

    const target = user.isAdmin ? "all" : "";
    document.title = user.isAdmin ? "Admin Dashboard" : "Products";
    

    const fetchData = () => {
        // get all active courses
        fetch(`${process.env.REACT_APP_API_URL}/products/${target}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((res) => res.json())
        .then((data) => {
            const productArr = data.map((product) => {
            return product;
            });

            setProducts(productArr);
        });
    };

    

    useEffect(() => {
        fetchData();
    }, [target]);

    return (
        <>
            {
                user.isAdmin ?
                <AdminView productsData={products} fetchData={fetchData} />
                :
                <UserView productsData={products} fetchData={fetchData} />
            }
        </>
    );
}

export default ProductPage;