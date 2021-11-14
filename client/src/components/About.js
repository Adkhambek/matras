import React from 'react';
import './about.css'

const About = () => {
    return (
        <section className='about'>
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <h5>Dream Cloud kompaniyasi haqida</h5>
                        <p>Penatibus viverra gravida rhoncus in. At turpis morbi ante tortor a est. Habitant adipiscing
                            ut sed pulvinar tellus, ut urna, fermentum:</p>
                        <div className="nums">
                            <ul>
                                <li>Penatibus viverra gravida rhoncus in.</li>
                                <li>Dolor integer in interdum viverra risus dolor enim.</li>
                                <li>Turpis senectus eu, eget aenean nulla pellentesque sed ut tempor.</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-6">
                        <iframe className="responsive-iframe" src="https://www.youtube.com/embed/P3Qyddg4bgg"/>
                    </div>
                </div>
                <div className="row second">
                    <div className="col-6">
                        <img className="w-100" src="/assets/about.png" alt=""/>
                    </div>
                    <div className="col-6 right">
                        <p className="mt-0 pe-0">Libero erat praesent ullamcorper eget tortor sed et. Nec id lobortis gravida vitae.
                            Scelerisque id fusce vitae ut. Integer sed vulputate sed nec. Arcu id mattis erat et
                            id. </p>
                        <div className="nums">
                            <ol className="mb-0">
                                <li>Id risus phasellus laoreet eget. A nec pulvinar.</li>
                                <li>Eu justo, tincidunt fringilla diam nulla.</li>
                                <li>Amet, nullam cras lacus, fermentum leo tellus sagittis.</li>
                                <li>Facilisi mauris condimentum sagittis odio rhoncus semper.</li>
                            </ol>
                        </div>
                        <p className="second-p">Ac tortor volutpat pellentesque mauris nisi, praesent. Et tempus accumsan est elementum
                            feugiat arcu mauris tincidunt. Eget faucibus pharetra et luctus eget ut fames. A cursus
                            elementum egestas eu scelerisque id.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
