const nodemailer = require('nodemailer');
const Order = require('./db/models/order');
const address = require('./db/models/address');
const Book = require('./db/models/book');
const User = require('./db/models/user');
const Address = require('./db/models/address');


const transporter = nodemailer.createTransport({
    service : 'gmail',
    auth: {
        user: 'volumepointbooks@gmail.com',
        pass: 'gaylthepsqlbrhvz'
    }
});

const forBuy = async (order_id)=>{

    console.log('working:'+order_id);

    const order = await Order.Order.findOne({order_id:order_id});
  
    const user = await User.findOne({user_id:order.user_id});

    const address = await Address.findOne({address_id:order.address_id});

    const to = user.email;
    const subject = "Thank you for Your Recent Order - Here are Your Order Details";
    const text = "Dear Customer,\n\nI hope this email finds you well. Thank you for your recent order with us. We are thrilled that you chose our company for your purchase, and we are confident that you will be completely satisfied with your products.\n\nAs promised, I am sending you the details of your order. Your order included the following items:\n\nOrder ID:"+order.order_id+"\nDelivery Address:"+address.house_no+","+address.society_name+","+address.area_name+","+address.nearby_location+","+address.city+","+address.state+","+address.pincode+"."+"\nNo of Items:"+order.no_of_item+"\nTotal:Rs."+order.total+"\nOrder Date:"+order.order_date+"\n\nPlease note that your order has already been shipped and you can expect to receive it within [delivery time]. If you have any questions or concerns about your order, please don't hesitate to contact us.\n\nThank you again for your business. We truly value your trust in our company and hope to serve you again in the future.\n\nBest regards,\n\n[Volume Point]"


    const mailOptions = {
        from : 'volumepointbooks@gmail.com',
        to : to,
        subject : subject,
        text : text,
    };

    transporter.sendMail(mailOptions, (error,info)=>{

        if(error)
            console.log(error);
        else
            console.log(info.response);
    });

}

const forSell = async (book_id)=>{

    console.log('working:'+book_id);

    const book = await Book.findOne({book_id:book_id});
  
    const user = await User.findOne({user_id:book.user_id});

    const address = await Address.findOne({address_id:book.receiving_address});

    const to = user.email;
    const subject = "Thank you for selling your book on VolumePoint";
    const text = "Dear Customer,\n\nI wanted to personally thank you for choosing VolumePoint as the platform to sell your book. We appreciate your business and trust in our platform.\n\nWe are committed to providing you with the best possible experience on our platform, and we hope that you will continue to use VolumePoint for all of your buying and selling needs.\n\nI am sending you the details of your order. Your selling included the following details:\n\nBook Title:"+book.title+"\nRecieving Address:"+address.house_no+","+address.society_name+","+address.area_name+","+address.nearby_location+","+address.city+","+address.state+","+address.pincode+"."+"\nQuantity:"+book.quanity+"\nBook Price:Rs."+book.price+"\nDate:"+book.on_sale_date+"\n\nIf you have any feedback or suggestions for how we can improve our platform, please do not hesitate to let us know. We value your input and are always looking for ways to improve.\n\nThank you again for choosing our platform VolumePoint.\n\nBest regards,\n\n[Volume Point]";


    const mailOptions = {
        from : 'volumepointbooks@gmail.com',
        to : to,
        subject : subject,
        text : text,
    };

    transporter.sendMail(mailOptions, (error,info)=>{

        if(error)
            console.log(error);
        else
            console.log(info.response);
    });

}

const forDonate = async (book_id)=>{

    console.log('working:'+book_id);

    const book = await Book.findOne({book_id:book_id});
  
    const user = await User.findOne({user_id:book.user_id});

    const address = await Address.findOne({address_id:book.receiving_address});

    const to = user.email;
    const subject = "Thank you for donate your book on VolumePoint";
    const text = "Dear Customer,\n\nI wanted to personally thank you for choosing VolumePoint as the platform to donate your book. We appreciate your business and trust in our platform.\n\nWe are committed to providing you with the best possible experience on our platform.\n\nI am sending you the details of your donate. Here are the details of your donate:\n\nBook Title:"+book.title+"\nRecieving Address:"+address.house_no+","+address.society_name+","+address.area_name+","+address.nearby_location+","+address.city+","+address.state+","+address.pincode+"."+"\nQuantity:"+book.quanity+"\nDonate Date:"+book.on_sale_date+"\n\nIf you have any feedback or suggestions for how we can improve our platform, please do not hesitate to let us know. We value your input and are always looking for ways to improve.\n\nThank you again for choosing our platform VolumePoint.\n\nBest regards,\n\n[Volume Point]";


    const mailOptions = {
        from : 'volumepointbooks@gmail.com',
        to : to,
        subject : subject,
        text : text,
    };

    transporter.sendMail(mailOptions, (error,info)=>{

        if(error)
            console.log(error);
        else
            console.log(info.response);
    });

}



// sendMail(to,subject,text);

module.exports = {forBuy,forSell,forDonate};