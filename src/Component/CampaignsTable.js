
import React, {useState, useEffect, Component}  from 'react';
import axios from 'axios';
import { MDBTable, MDBTableHead, MDBTableBody, MDBRow, MDBCol, MDBContainer, MDBBtn, MDBBadge, MDBCardHeader } from 'mdb-react-ui-kit';
import { DateRangePicker } from 'react-date-range';

function CampaignsTable() {
  const[campaigns, setCampaigns]= useState([]);
  const[allCampaigns, setAllCampaigns]= useState([]);
  const[value, setValue]= useState(" ");
  const[startDate, setStartDate]= useState(new Date());
  const[endDate, setEndDate]= useState(new Date());
  const [open, setIsOpen] = useState(false);
  let formattedDate = endDate.toLocaleDateString('en-GB');
  useEffect(()=> {addCampaigns();
 }, []);
 
 const addCampaigns = async () => {
   return  await axios
   .get("https://ankita070720.github.io/campaigns:5000/campaigns")
   .then((response)=>{setCampaigns(response.data); setAllCampaigns(response.data);})
   .catch((err)=> console.log(err));
 };
 const handleReset = () => { addCampaigns() };
 const handleResetFilters = () => { addCampaigns(); 
   setStartDate(new Date());
   setEndDate(new Date());
    };
 
 const handleSearch = async(e) => {
   e.preventDefault();
   return await axios.get(`https://ankita070720.github.io/campaigns/:5000/campaigns?q=${value}`)
   .then((response)=>{
     setCampaigns(response.data);
     setValue("");
   }
     ).catch((err)=>console.log(err));
 };
 const handleSelect = (date) => {
 
  let filtered = allCampaigns.filter((campaign)=>{
  let campaignsDate = new Date(campaign["startDate"]);
  return(campaignsDate>= date.selection.startDate &&
  campaignsDate<= date.selection.endDate);
 })
 setStartDate(date.selection.startDate);
 setEndDate(date.selection.endDate);
 setCampaigns(filtered);
 
 };
 const selectionRange = {
   startDate: startDate,
   endDate: endDate,
   key: 'selection',
 }
 
    return (
      <MDBContainer>
      <div style={{ marginTop: "30px" }}>
        <MDBRow>
          <MDBCol size="12">
            <form style={{
              padding: "15px 0px 50px",
              maxWidth: "700px",
              alignContent: "center",
            }}
              className="d-flex input-group w-auto" onSubmit={handleSearch}>
              <input type="text" className="form-control" placeholder="Search Name" value={value} onChange={(e) => setValue(e.target.value)} />
              <MDBBtn type="submit" color="dark">
                Search
              </MDBBtn>
              <MDBBtn className="mx-2" color="info" onClick={() => handleReset()}>
                Reset
              </MDBBtn>
         </form>
          </MDBCol>
          <MDBCol size="9">
            <MDBTable>
              <MDBTableHead light>
               <tr>
                  <th scope="col">No.</th>
                  <th scope="col">Name.</th>
                  <th scope="col">StartDate.</th>
                  <th scope="col">EndDate.</th>
                  <th scope="col">Status.</th>
                  <th scope="col">Budget.</th>
               </tr>
          </MDBTableHead>
              {campaigns.length === 0 ? (
                <MDBTableBody className="align-center mb-0">
                  <tr>
                    <td colSpan={8} className="text-center mb-0">  No data found</td>
                  </tr>
                </MDBTableBody>
              ) : (
                campaigns.map((item, index) => (
                  <MDBTableBody key={index}>
                    <tr>
                      <th scope="row">{index + 1}</th>
                       <td>{item.name}</td>
                      <td>{item.startDate}</td>
                      <td>{item.endDate}</td>
                      <td>
                        {new Date(item.endDate) >= endDate ? (<MDBBadge style={{
                          padding: "10px"
                        }} color='success' pill>
                          Active

                        </MDBBadge>) : (<MDBBadge style={{
                          padding: "10px"
                        }} color='danger' pill>
                          InActive

                        </MDBBadge>)}
                     </td>
                      <td>{item.budget}</td>
                       </tr>
                      </MDBTableBody>
                ))
              )}
            </MDBTable>
           </MDBCol>
           <MDBCol size="3">
            <span class='material-icons' onClick={() => setIsOpen(!open)}>filter_list</span>
            {open ? (
              <div>
                <h6>Filter Results</h6>
                <DateRangePicker
                  ranges={[selectionRange]}
                  onChange={handleSelect} showDateDisplay="false" />
                <MDBBtn className="mx-2 text-center mb-0" color="info" onClick={() => handleResetFilters()}>
                  Clear All Filters
                </MDBBtn>
              </div>

            ) : null}
         </MDBCol>
        </MDBRow>
      </div>
    </MDBContainer> 
    );
  };
  
  export default CampaignsTable;