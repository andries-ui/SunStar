import React from 'react';
import './featuredinfo.css';
import { ArrowDownward, ArrowUpward} from '@mui/icons-material';

export default function FeaturedInfo() {
    return (
        <div className="featured">
            <div className="featureditem">
                <span className="featuredtitle">Revenue</span>
                <div className="featuredmoneycontainer">
                <span className="featuredmoney">R5,376.67</span>
                <span className="featuredmoneyrate">-7.3  <ArrowDownward className='featuredicon negative'/></span>
                </div>
                <span className="featuredsub">Compared to last month</span>
            </div>

            <div className="featureditem">
                <span className="featuredtitle">Revenue</span>
                <div className="featuredmoneycontainer">
                <span className="featuredmoney">R5,376.67</span>
                <span className="featuredmoneyrate">-7.3  <ArrowDownward className='featuredicon negative'/></span>
                </div>
                <span className="featuredsub">Compared to last month</span>
            </div>
            
            <div className="featureditem">
                <span className="featuredtitle">Revenue</span>
                <div className="featuredmoneycontainer">
                <span className="featuredmoney">R5,376.67</span>
                <span className="featuredmoneyrate">-7.3  <ArrowDownward className='featuredicon negative'/></span>
                </div>
                <span className="featuredsub">Compared to last month</span>
            </div>
            
            <div className="featureditem">
                <span className="featuredtitle">Revenue</span>
                <div className="featuredmoneycontainer">
                <span className="featuredmoney">R5,376.67</span>
                <span className="featuredmoneyrate">1.3  <ArrowUpward className='featuredicon'/></span>
                </div>
                <span className="featuredsub">Compared to last month</span>
            </div>
        </div>
    )
}
