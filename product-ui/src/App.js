import { useEffect,useState } from 'react';
import axios from 'axios';
import './App.css';
const API_URL = 'https://localhost:7159/api/products';
function App() {
  const[products,setProducts]=useState([]);
  const [loading,setLoading]=useState(false);
  const [isediting,setIsEditing]=useState(false);
  const[formData,setFormData]=useState({
    id:0,
    name:'',
    quantity:0,
    price:0,
    category:'',
    location:'',
    description:'',
    company:''
  });
  const [categories]= useState(['Home','Office','Electronics','Clothing','Food','Books','Furniture']);
  useEffect(() => {
    loadproducts();
  }, []);
  const loadproducts = async () => {
    setLoading(true);
    const res=await axios.get(API_URL);
    setProducts(res.data);
    debugger
    setLoading(false);
  }
  const handleDelete=async(id)=>{
    if(!window.confirm("Are you sure you want to delete this product?"))    {
      return;
    }
    setLoading(true);
    await axios.delete(`${API_URL}/${id}`);
    loadproducts();
  }
  const handleChange=(e)=>{
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    })
  }
  const handleUpdatebtn=async(product)=>
  {
    setIsEditing(true);
    setFormData({
      id:product.id,
      name:product.name,
      quantity:product.quantity,
      price:product.price,
      category:product.category,
      location:product.location,
      description:product.description,
      company:product.company
    })
  }
  const handleUpdate=async(e)=>{
    e.preventDefault();
    setLoading(true);
    const productsData={
      id:formData.id,
      name:formData.name,
      quantity:formData.quantity,
      price:formData.price,
      category:formData.category,
      location:formData.location,
      description:formData.description,
      company:formData.company,
      createdAt:new Date(),
      updatedAt:new Date(),
    }
    debugger
    await axios.put(`${API_URL}/${productsData.id}`,productsData);
    setFormData({
      name:'',
      quantity:0,
      price:0,
      category:'',
      location:'',
      description:'',
      company:''
    });
    setLoading(false);
    setIsEditing(false);
    loadproducts();
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    setLoading(true);

    const productsData={
    name:formData.name,
    quantity:formData.quantity,
    price:formData.price,
    category:formData.category,
    location:formData.location,
    description:formData.description,
    company:formData.company,
    createdAt:new Date(),
    updatedAt:new Date()
    }
    await axios.post(API_URL,productsData);
    setFormData({
      name:'',
      quantity:0,
      price:0,
      category:'',
      location:'',
      description:'',
      company:''
    });
    loadproducts();
  }
  // Safe date formatter function
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    // Check if date is valid
    //if (isNaN(date.getTime())) return 'Invalid Date';
    //return date.toLocaleString();
    return date.toLocaleDateString();
  };
  

  return (
    <div style={styles.body}>
      <h1>My Products</h1>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <div>
          <form onSubmit={handleSubmit} style={styles.form}>
            <h3 style={{padding:'10px'}}>Add New Product</h3>
            <div style={styles.formfield}> 
              <div style={{display:"flex", flexDirection:"column", flex:1,paddingRight:"10px"}}>
                <label style={styles.label} htmlFor="name">Name:</label>
                <input style={styles.input} type="text" name="name"  value={formData.name} onChange={handleChange} required />
              </div>
              <div style={{display:"flex", flexDirection:"column", flex:1 ,paddingRight:"10px"}}>
                  <label style={styles.label} htmlFor="quantity">Quantity:</label>   
                  <input style={styles.input} type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />
              </div>
              <div style={{display:"flex", flexDirection:"column", flex:1,paddingRight:"10px"}}>
                <label style={styles.label} htmlFor="price">Price:</label>
                <input style={styles.input} type="number" name="price" value={formData.price} onChange={handleChange} required />
              </div>
              <div style={{display:"flex", flexDirection:"column", flex:1,paddingRight:"10px"}}>
                <label style={styles.label} htmlFor="category">Category:</label>
                {/*<input style={styles.input} type="text" name="category" value={formData.category} onChange={handleChange} required />*/}
                <select style={styles.input} type="text" name="category" value={formData.category} onChange={handleChange} required>
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div style={{display:"flex", flexDirection:"column", flex:1,paddingRight:"10px"}}>
                <label style={styles.label} htmlFor="location">Location:</label>
                <input style={styles.input} type="text" name="location" value={formData.location} onChange={handleChange} required />
              </div>
              <div style={{display:"flex", flexDirection:"column", flex:1,paddingRight:"10px"}}>
                <label style={styles.label} htmlFor="description">Description:</label>
                <input style={styles.input} type="text" name="description" value={formData.description} onChange={handleChange} required />
              </div>
              <div style={{display:"flex", flexDirection:"column", flex:1,paddingRight:"10px"}}>
                <label style={styles.label} htmlFor="company">Company:</label>
                <input style={styles.input} type="text" name="company" value={formData.company} onChange={handleChange} required />
              </div>
            </div>
            {isediting? (<div style={styles.formbutton}> 
              <button type="button" onClick={handleUpdate} style={styles.button}>Update Product</button>
            </div>): 
            (
              <div style={styles.formbutton}> 
              <button type="submit" style={styles.button}>Add Product</button>
            </div>
            )}
            
            
          </form>
          <h3>Product List</h3>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Quantity</th>
                <th style={styles.th}>Price</th>
                <th style={styles.th}>Category</th>
                <th style={styles.th}>Location</th>
                <th style={styles.th}>Description</th>
                <th style={styles.th}>Company</th>
                <th style={styles.th}>Created At</th>
                <th style={styles.th}>Updated At</th>
                <th style={styles.th}>Actions</th>
              </tr>
              
            </thead>
            <tbody>
              {products.map((product)=>(
                <tr key={product.id}>
                  <td style={styles.td}>{product.id}</td>
                  <td style={styles.td}>{product.name}</td>
                  <td style={styles.td}>{product.quantity}</td> 
                  <td style={styles.td}>{product.price}</td>
                  <td style={styles.td}>{product.category}</td>
                  <td style={styles.td}>{product.location}</td>
                  <td style={styles.td}>{product.description}</td>
                  <td style={styles.td}>{product.company}</td>
                  <td style={styles.td}>{formatDate(product.createdDateTime)}</td>
                  <td style={styles.td}>{formatDate(product.updatedDateTime)}</td>
                  <td style={styles.td}>
                    <button style={{padding:"7px", marginRight:"5px"}} onClick={()=>handleUpdatebtn(product)}>Update</button>
                    <button style={{padding:"7px"}} onClick={() => handleDelete(product.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
const styles = {
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    border: '1px solid #ddd',
    padding: '8px',
    backgroundColor: '#f2f2f2',
  },
  td: {
    border: '1px solid #ddd',
    padding: '8px',
  },
  form: {
    display: 'inline',
    flexDirection: 'column',
    maxWidth: '400px',padding: '20px',
  },
  label: {
    marginBottom: '5px',
    width: '20%',  
  },
  input: {
    marginBottom: '10px',
    fontSize: '16px',
    height: '40px',
    width: '100%',
    display: 'block',
    boxSizing: 'border-box',
    border: '1px solid #ccc',
    padding: '10px',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
  formfield: {
    display: 'flex',
    flexDirection: 'row',
    padding: '10px',
    width: '100%',
  },
  formbutton: {
    padding: '10px',
  },
  body: {
    padding: '20px',
  }
};
export default App;
