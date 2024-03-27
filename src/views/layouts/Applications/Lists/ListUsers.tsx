import './template.css';

const ListUsers = ()  => {

    return (
        <div className='control-pane'>
            <div className="sample_container avatar-types">
                <div className="avatar-block">
                    {/* <!-- Card Component --> */}
                    <div className="e-card e-avatar-showcase">
                        <div className="e-card-content">
                            {/* <!-- XLarge Circle Avatar Component --> */}
                            <div className="e-avatar e-avatar-xlarge e-avatar-circle">
                                <img className="image" src="/assets/images/card4.png" alt="avatar" />
                            </div>
                        </div>
                        <div className="e-card-content">
                            <div>Image</div>
                        </div>
                    </div>
                </div>
                <div className="avatar-block">
                    {/* <!-- Card Component --> */}
                    <div className="e-card e-avatar-showcase">
                        <div className="e-card-content">
                            {/* <!-- XLarge Circle Avatar Component --> */}
                            <div className="e-avatar e-avatar-xlarge e-avatar-circle">
                                <div className="svg_icons chrome"></div>
                            </div>
                        </div>
                        <div className="e-card-content">
                            <div>SVG</div>
                        </div>
                    </div>
                </div>
                <div className="avatar-block">
                    {/* <!-- Card Component --> */}
                    <div className="e-card e-avatar-showcase">
                        <div className="e-card-content">
                            {/* <!-- XLarge Circle Avatar Component --> */}
                            <div className="e-avatar e-avatar-xlarge e-avatar-circle">GR</div>
                        </div>
                        <div className="e-card-content">
                            <div>Initial</div>
                        </div>
                    </div>
                </div>
                <div className="avatar-block">
                    {/* <!-- Card Component --> */}
                    <div className="e-card e-avatar-showcase">
                        <div className="e-card-content">
                            {/* <!-- XLarge Circle Avatar Component --> */}
                            <div className="e-avatar e-avatar-xlarge e-avatar-circle">
                                <div className="e-people icons"></div>
                            </div>
                        </div>
                        <div className="e-card-content">
                            <div>Font Icon</div>
                        </div>
                    </div>
                </div>
                <div className="avatar-block">
                    {/* <!-- Card Component --> */}
                    <div className="e-card e-avatar-showcase">
                        <div className="e-card-content">
                            {/* <!-- XLarge Circle Avatar Component --> */}
                            <div className="e-avatar e-avatar-xlarge e-avatar-circle">User</div>
                        </div>
                        <div className="e-card-content">
                            <div>Word</div>
                        </div>
                    </div>
                </div>
                <div className="avatar-block">
                    {/* <!-- Card Component --> */}
                    <div className="e-card e-avatar-showcase">
                        <div className="e-card-content">
                            {/* <!-- XLarge Circle Avatar Component --> */}
                            <div className="e-avatar e-avatar-xlarge e-avatar-circle custom">
                                <div className="e-people icons"></div>
                            </div>
                        </div>
                        <div className="e-card-content">
                            <div>Custom</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ListUsers;