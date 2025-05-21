import { useState } from "react"
import userdetailService from "./userdetailService"
import { useNavigate } from "react-router-dom"

export default function Register(){
    const [formData,setFormData]=useState({
        firstName:'',
        lastName:'',
        email:'',
        mobileNumber:'',
        password:''
    })
    const handleChange=(e)=>{
        const {name,value}=e.target
        setFormData((prev)=>({...prev,[name]:value}))
    }

    const navigate=useNavigate()

    const handleSubmit=(e)=>{
        e.preventDefault()
        userdetailService.saveUserDetials(formData).then(response=>{
            alert("User register successfully, redirecting to Login page")
            navigate('/login')
        }).catch((error)=>{
            console.log("Error Submitting Data"+error)
            alert("Registration Failed, Please Try again")
        })
    }

    return (
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card p-4 shadow-sm">
                <h2 className="text-center mb-4">Register Account</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <input type="text" className="form-control" placeholder="First Name" onChange={handleChange} value={formData.firstName} name="firstName" />
                  </div>
                  <div className="mb-3">
                    <input type="text" className="form-control" placeholder="Last Name" onChange={handleChange} value={formData.lastName} name="lastName" />
                  </div>
                  <div className="mb-3">
                    <input type="email" className="form-control" placeholder="Email" onChange={handleChange} value={formData.email} name="email" />
                  </div>
                  <div className="mb-3">
                    <input type="tel" className="form-control" placeholder="Mobile Number" onChange={handleChange} value={formData.mobileNumber} name="mobileNumber" />
                  </div>
                  <div className="mb-3">
                    <input type="password" className="form-control" placeholder="Password" onChange={handleChange} value={formData.password} name="password" />
                  </div>
                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary">Register</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
      
}
