import React from "react"
import { Link } from "react-router-dom"
import "../css/style.css"

export default () => (
	<section>

		<div className="jumbotron backgroundbanner2">

			<div className="row">
				<div className="col-md-12">
				</div>
			</div>

			<div className="container noPadding">
				<div className="row ml-4 mr-4">

					<div className="col-md-4 mt-3">
						<div className="container box_container4">
							<div className="card">
								<img src="/images/design/admin1.svg" className="card-img-top" alt="..." />
								<div className="card-body">
									<h5 className="card-title category_title2">Manage all your tasks</h5>
								</div>
							</div>
						</div>
					</div>

					<div className="col-md-4 mt-3">
						<div className="container box_container4">
							<div className="card">
								<img src="/images/design/recluta5.svg" className="card-img-top" alt="..." />
								<div className="card-body">
									<h5 className="card-title category_title2">Get to know the new hires</h5>
								</div>
							</div>
						</div>
					</div>

					<div className="col-md-4 mt-3">
						<div className="container box_container4">
							<div className="card">
								<img src="/images/design/tablero1.svg" className="card-img-top" alt="..." />
								<div className="card-body">
									<h5 className="card-title category_title2">Keep updated with our dashboard</h5>
								</div>
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>
	</section>
)
