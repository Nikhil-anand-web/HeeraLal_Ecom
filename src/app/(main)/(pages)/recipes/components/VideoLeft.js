import React from 'react'

const VideoLeft = ({recipe}) => {
    return (
        <div className="row my-5">
                    <div className="col-md-5 col-12 ">
                        <iframe width="100%" height="315" src="https://www.youtube.com/embed/wc2NEd4WTyw?si=syDIAadVnE-RQPB5" title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>            </div>
                    <div className="col-md-7 col-12">
                        <h2>Recipe Title</h2>
                        <hr />

                        <p className="text-justify">This is some recipe introduction.  This is some recipe introduction. This is some recipe introduction. This is some recipe introduction. This is some recipe introduction. This is some recipe introduction. This is some recipe introduction. This is some recipe introduction. This is some recipe introduction. This is some recipe introduction. This is some recipe introduction. This is some recipe introduction. This is some recipe introduction. This is some recipe introduction. This is some recipe introduction. This is some recipe introduction. This is some recipe introduction. This is some recipe introduction. This is some recipe introduction. This is some recipe introduction. This is some recipe introduction. This is some recipe introduction. This is some recipe introduction. This is some recipe introduction. This is some recipe introduction. This is some recipe introduction. This is some recipe introduction. </p>
                        <p>This is some recipe introduction. This is some recipe introduction. This is some recipe introduction. This is some recipe introduction. This is some recipe introduction. This is some recipe introduction. This is some recipe introduction. This is some recipe introduction. This is some recipe introduction.</p>

                    </div>

                </div>
    )
}

export default VideoLeft
