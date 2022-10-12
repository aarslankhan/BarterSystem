/*
List of bid items for current auction items
*/
import React from 'react';
import BidItem from './BidItem/BidItem';
import classes from './BidItems.css';
import { withRouter } from 'react-router-dom';

const bidItems = (props) => {

    // check if the owner already exists in the target object
    function isInTarget(targetObj, owner){
        for (var i=0; i< targetObj.length; i++){
            if(targetObj[i].owner === owner){
                return true;
            }
        }
        return false;
    }

    let bidItems = null
    if(props.bidItems){
        var bidItemsComb = []
        props.bidItems.forEach(function(item){
            var searchResult = isInTarget(bidItemsComb, item.owner);
            var newItem = item
            if(searchResult === false){
                newItem['isNew'] = true;
                bidItemsComb.push(newItem);
            }
            else{
                newItem['isNew'] = false;
                bidItemsComb.push(newItem);
            }
        });

        bidItems = (
            bidItemsComb.map((item, index) => (
                <BidItem key={index}
                    owner={item.owner}
                    isNew = {item.isNew}
                    title={item.title}
                    zipcode={item.zipcode}
                    itemOwner={props.itemOwner}
                    onClick={(bidderid) => props.onClick(item.owner, bidderid)}
                />
            ))
        );
    }
    return (
        <div className={classes.BidItems}>
            <div className={classes.content}>
                <div className={classes.name}>Current Bids</div>
                {props.isOwner ? null
                    :<div className={classes.bidbtn} onClick={props.toggleModal}>Add Bid(s)</div>
                }
            </div>
            {bidItems}
        </div>

    )
}


export default withRouter(bidItems);
