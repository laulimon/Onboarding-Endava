import React from "react"
import { Link } from "react-router-dom"
import "../css/style.css"

export default ({ user }) => (
	<section>

		<div className="jumbotron backgroundbanner" style={{ height: "300px" }} >
			<div className="row">
				<div className="col-md-6" style={{ height: "300px" }}>
					<p className="banner-title2">ADMIN SECTIONS</p>
					<p className="banner-subtitle2">Find out all that you can do with your admin's account! </p>
				</div>
				<div className="col-md-6 text-center" >
					<img src="images/design/tareas1.svg" className="img-fluid" style={{ height: "300px", marginTop: "-32px" }} />
				</div>
			</div>
		</div>

		<div className="row ml-4 mr-4">

			<div className="col-md-4 mt-3">
				<div className="container box_container2">
					<div className="card">
						<img src="/images/design/admin1.svg" className="card-img-top" alt="..." />
						<div className="card-body">
							<h5 className="card-title category_title">My Tasks</h5>
							<p className="card-text category_text">See the activities that you have going on, all in one section.</p>
							<Link to={`/myTasks/${user.id}`}>
								<button className="btn category_button btn-block mb-2">Access</button>
							</Link>
						</div>
					</div>
				</div>
			</div>
			<>
				{(user.isAdmin) ? (
					<>
						<div className="col-md-4 mt-3">
							<div className="container box_container2">
								<div className="card">
									<img src="/images/design/recluta5.svg" className="card-img-top" alt="..." />
									<div className="card-body">
										<h5 className="card-title category_title">New Hires</h5>
										<p className="card-text category_text">Get to know all the new hires, add new ones, and start their onboarding process.</p>
										<Link to='/recruits'>
											<button className="btn category_button btn-block mb-2">Access</button>
										</Link>
									</div>
								</div>
							</div>
						</div>
					</>
				) : (
						null
					)
				}
			</>
			<div className="col-md-4 mt-3">
				<div className="container box_container2">

					<div className="card">
						<img src="/images/design/tablero1.svg" className="card-img-top" alt="..." />
						<div className="card-body">
							<h5 className="card-title category_title">My Dashboard</h5>
							<p className="card-text category_text">Discover al the metrics and reports that you need.</p>
							<Link to='/dashboard'>
								<button className="btn category_button btn-block mb-2">Access</button>
							</Link>
						</div>
					</div>
				</div>
			</div>
			<>
				{(user.isAdmin) ? (
					<>
						<div className="col-md-4 mt-3">
							<div className="container box_container2">
								<div className="card">
									<img src="/images/design/recluta5.svg" className="card-img-top" alt="..." />
									<div className="card-body">
										<h5 className="card-title category_title">Users</h5>
										<p className="card-text category_text">Inspect, create and edit all your users.</p>
										<Link to='/users'>
											<button className="btn category_button btn-block mb-2">Access</button>
										</Link>
									</div>
								</div>
							</div>
						</div>
					</>
				) : (
						null
					)
				}
			</>
		</div>
	</section>
)
