import React from 'react'
import { ServiceData, AboutData, AddressData } from '@/data/FooterData'
import { PhoneOutlined, MailOutlined } from "@ant-design/icons"
import { FaFacebookF, FaInstagram, FaYoutubeSquare } from 'react-icons/fa'
import { CiYoutube } from "react-icons/ci"

const Footer = () => {
	return (
		<div className="text-left footer">
			<div className="row">
				<div className="col-9 row" style={{ paddingRight: "100px" }}>
					<div className="col-4 fs-13">
						<ul>
							{ServiceData.map((service) => (
								<li key={service.heading}>
									<p className="fw-bold">{service.heading}</p>
									<ul>
										{service.list.map((item) => (
											<li key={item}>
												<a href="#">
													{item}
												</a>
											</li>
										))}
									</ul>
								</li>
							))}
						</ul>
					</div>
					<div className="col-4 fs-13">
						<ul>
							{AboutData.map((service) => (
								<li key={service.heading}>
									<p className="fw-bold">{service.heading}</p>
									<ul>
										{service.list.map((item) => (
											<li key={item}>
												<a href="#">
													{item}
												</a>
											</li>
										))}
									</ul>
								</li>
							))}
						</ul>
					</div>
					<div className="col-4 fs-13">
						<ul>
							{AddressData.map((service) => (
								<li key={service.heading}>
									<p className="fw-bold">{service.heading}</p>
									<ul>
										{service.list.map((item) => (
											<li key={item}>
												<a href="#">
													{item}
												</a>
											</li>
										))}
									</ul>
								</li>
							))}
						</ul>
					</div>
				</div>
				<div className="col-3 row">
					<div className="col-12">
						<ul>
							<li>
								<h5>
									HienThanhShop luôn lắng nghe bạn!
								</h5>
							</li>
							<div>
								<button className='d-none border-radius fw-bold'>
									Gửi ý kiến
								</button>
							</div>
						</ul>
					</div>
				</div>
				<div className="d-none copy-right-box fs-11 position-relative">
					<p className="fw-bold text-uppercase">© Công ty tnhh hienthanh</p>
					<p>Mã số doanh nghiệp: 0108617038.</p>
				</div>
			</div>
		</div>
	)
}

export default Footer