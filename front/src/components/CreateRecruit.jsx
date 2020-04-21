import React from "react";



export default ({ handleChange, handleSubmit, disciplinesOptions }) => {
  if (disciplinesOptions.length) {
    return (
      <div>
        <div>
          <div className="card-body mx-auto" style={{ maxWidth: "400px" }}>
            <h4 className="card-title mt-2 text-center">Add a New Hire</h4>
            <p className="text-center subtitle4">Add a new member to your organization!</p>

            <form onSubmit={handleSubmit}>

              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text"> <i className="fa fa-user"></i> </span>
                </div>
                <input onChange={handleChange} name="name" className="form-control" placeholder="Name" type="text" />
              </div>

              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text"> <i className="fa fa-user"></i> </span>
                </div>
                <input onChange={handleChange} name="lastName" className="form-control" placeholder="Lastname" type="text" />
              </div>

              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text"> <i className="fa fa-envelope"></i> </span>
                </div>
                <input onChange={handleChange} name="email" className="form-control" placeholder="Email address" type="email" />
              </div>

              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text"> <i className="fa fa-phone"></i> </span>
                </div>
                <input onChange={handleChange} name="phone" className="form-control" placeholder="Phone number" type="text" />
              </div>

              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text"> <i className="fa fa-id-card"></i> </span>
                </div>
                <input onChange={handleChange} name="DNI" className="form-control" placeholder="DNI" type="text" />
              </div>

              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text"> <i className="fa fa-user-clock"></i> </span>
                </div>
                <input onChange={handleChange} type="date" name="entryDate" max="2050-12-31" min="2020-03-01" className="form-control"
                  placeholder="Starting on" />
              </div>

              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text"> <i className="fa fa-building"></i> </span>
                </div>
                <select onChange={handleChange} selected="" name="discipline" className="form-control">
                  <option> Select Discipline</option>
                  {disciplinesOptions.map((disciplinesOption) => (
                    <option key={disciplinesOption.id} className="border1">{disciplinesOption.description}</option>
                  ))}>
                </select>
              </div>

              <div className="form-group">
                <button type="submit" className="btn btn-danger btn-block"> Create New Hire  </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div class="spinner-border text-danger" role="status" style={{ marginTop: "20%", marginLeft: "50%" }}>
        <span class="sr-only">Loading...</span>
      </div>
    )
  }
};
