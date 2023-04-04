const {User} = require('../../models/user');
const {Rental} = require('../../models/rental');
const request = require('supertest');
const {  mongoose } = require('mongoose');
const { Movie } = require('../../models/movie');


describe("POST:/api/returns",()=>{
    let server;
    let token
    let movie;
    let customer;
    let movieId;
    let customerId;

    beforeEach(async()=>{
        server = require("../../index");
         token = new User().generateAuthToken();
         movie;
         movieId = mongoose.Types.ObjectId();
         customerId = mongoose.Types.ObjectId();
        
        const exec = async ()=>{
            await request(server)
            .set('x-auth-token',token)
            .post("/api/returns")
            .send({movieId,customerId});
        };
        customer = new Customer({
            _id:customerId,
            name:"someone",
            isGold:true,
            phone:"1234567890"
        });
        await customer.save();
        movie = new Movie({
            _id: movieId,
            title: '12345',
            dailyRentalRate: 2,
            genre: { name: '12345' },
            numberInStock: 10 
          });
          await movie.save();
      
          rental = new Rental({
            customer: {
              _id: customerId,
              name: '12345',
              phone: '12345'
            },
            movie: {
              _id: movieId,
              title: '12345',
              dailyRentalRate: 2
            }
          });
          await rental.save();
        });

        afterEach(()=>{
            server.close();
            Rental.remove({});
        })
    
    it("should return 401 if user is not logged in",async()=>{
       token = ""
   const res = await exec();
   expect(res.status).toBe(400);
    })

it("should return 400 if customerId or movieId is empty",async()=>{
    movieId="";
    customerId="";
    const res = await exec();
    expect(res.status).toBe(400);
})
it("should 400 customerId or movieId is invalid",async()=>{
//pass object-id middleware;
movieId="123";
customerId="1234";
const res = await exec();
expect(res.status).toBe(400);
});
it("should 400 customerId or movieId is invalid",async()=>{
    //pass object-id middleware;
    movieId="123";
    customerId="1234";
    const res = await exec();
    expect(res.status).toBe(400);
    });
    it("should return 400 if movie is not found with the given movieId",async()=>{
        //pass valid object-id middleware;
        movieId = new mongoose.Types.ObjectId();
        const res = await exec();
        expect(res.status).toBe(400);
        });
    it("should 400 customerId is invalid",async()=>{
            //pass object-id middleware;
            customerId = mongoose.Types.ObjectId();
            const res = await exec();
            expect(res.status).toBe(400);
            });
    it("should 400 if rental is invalid",async()=>{
                //pass object-id middleware;
                rental = null;
                const res = await exec();
                expect(res.status).toBe(400);
                });
    it("should return 400 if rental already proccessed.",async()=>{
                    //pass object-id middleware;
                    
                    const res = await exec();
                    expect(res.status).toBe(400);
                    });

                   
it("should return valid and truthy values",async()=>{
    const res = await exec();
    expect(res.status).toBe(200);
    expect(res.body.dateReturned).toBeTruthy();
    expect(res.body.rentalFee).toBeTruthy();
    expect(res.body.numberInStock).toBeTruthy();
    expect(res.body).toMatch(rental);
})
    });