import React,{useState,useEffect, useContext} from 'react'
import { Modal,Button } from 'react-bootstrap'
import SERVER_BASE_URL from '../services/serverUrl'
import { editProjectContext } from '../context/ContextShare'
import { updateProjectAPI } from '../services/allAPI'

const Edit = ({project}) => {
  // project key in the props will hold project data to be displayed in edit component
  const {editProjectResponse,setEditProjectResponse} = useContext(editProjectContext)
  const [preview,setPreview] = useState("")
  const [uploadFileStatus,setUploadFileStatus] = useState(false)

  const [projectDetails,setProjectDetails] = useState({
   id:project?._id, title:project?.title, language:project?.language, overview:project?.overview, github:project?.github, website:project?.website, projectImage:""
  })
  // projectImage is used to hold user uploaded file insted of existing file
  console.log(projectDetails);

  const [show, setShow] = useState(false);

  useEffect(()=>{
    if(projectDetails.projectImage.type=="image/png" || projectDetails.projectImage.type=="image/jpg" || projectDetails.projectImage.type=="image/jpeg"){
      setUploadFileStatus(true)
      setPreview(URL.createObjectURL(projectDetails.projectImage))
    }else{
      // invalid image file
      setUploadFileStatus(false)
      setProjectDetails({...projectDetails,projectImage:""})
    }
},[projectDetails.projectImage])

  const handleClose = () =>{
    setShow(false);
    setProjectDetails({
      id:project?._id, title:project?.title, language:project?.language, overview:project?.overview, github:project?.github, website:project?.website, projectImage:""
    })
  } 

  const handleShow = () =>{
    setShow(true);
    setProjectDetails({
      id:project?._id, title:project?.title, language:project?.language, overview:project?.overview, github:project?.github, website:project?.website, projectImage:""
    })
  } 

  const handleUpdateProject = async ()=>{
    const {id,title,language,overview,github,website,projectImage} = projectDetails
    if(title && language && overview && github && website){
      // api call
      const reqBody = new FormData()
      reqBody.append("title",title)
      reqBody.append("language",language)
      reqBody.append("overview",overview)
      reqBody.append("github",github)
      reqBody.append("website",website)
      // projectImage will have value only when user re-upload project picture
    preview? reqBody.append("projectImage",projectImage): reqBody.append("projectImage",project?.projectImage)
      const token = sessionStorage.getItem("token")
      if(token){
        const reqHeader = {
          "projectImage" : "multipart/form-data",
          "Authorization" : `Bearer ${token}`
        }
        // make api call
        try{
          const result = await updateProjectAPI(id,reqBody,reqHeader)
          if(result.status==200){
            alert("Project Updated Succesfully")
            handleClose()
            // share 
            setEditProjectResponse(result)
          }
        }catch(err){
          console.log(err);
          
        }
      }
    }else{
      alert("Please fill the form completely!!!")
    }
  }

  return (
    <>
      <button onClick={handleShow} className="btn"> <i className="fa-solid fa-edit"></i> </button>
      <Modal size='lg' centered show={show} onHide={handleClose} backdrop="static" keyboard={false} >
        <Modal.Header closeButton>
          <Modal.Title>Edit Project Details!</Modal.Title>
        </Modal.Header>
       <Modal.Body>
            <div className="row align-items-center">
              <div className="col-lg-4">
                  <label>
                    <input onChange={e=>setProjectDetails({...projectDetails,projectImage:e.target.files[0]})} type="file" style={{display:'none'}} />
                  <img className='img-fluid' height={'200px'} src={preview?preview:`${SERVER_BASE_URL}/uploads/${project?.projectImage}`} alt="" />
                  </label>
                 { 
                 !uploadFileStatus &&
                  <div className="text-warning fw-bolder">*Upload only the following file types (jpeg, jpg, png) here!!! </div>
                 }
              </div>
              <div className="col-lg-8">
                <div className="mb-2">
                  <input value={projectDetails.title} onChange={e=>setProjectDetails({...projectDetails,title:e.target.value})} type="text" className="form-control" placeholder='Project Title' />
                </div>
                <div className="mb-2">
                  <input value={projectDetails.language} onChange={e=>setProjectDetails({...projectDetails,language:e.target.value})} type="text" className="form-control" placeholder='Project Languages' />
                </div>
                <div className="mb-2">
                  <input value={projectDetails.overview} onChange={e=>setProjectDetails({...projectDetails,overview:e.target.value})} type="text" className="form-control" placeholder='Project Overview' />
                </div>
                <div className="mb-2">
                  <input value={projectDetails.github} onChange={e=>setProjectDetails({...projectDetails,github:e.target.value})} type="text" className="form-control" placeholder='Project Github Link' />
                </div>
                <div className="mb-2">
                  <input value={projectDetails.website} onChange={e=>setProjectDetails({...projectDetails,website:e.target.value})} type="text" className="form-control" placeholder='Project Website Link' />
                </div>
              </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleUpdateProject} variant="primary">Update</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Edit