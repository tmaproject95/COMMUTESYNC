import {pool} from '../db.js';

export const getAllRoutes=(req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).send("Connection Error");
        }
        else{
            connection.query('SELECT Route_ID, Source, Destination, Est_Duration FROM Routes',(err, result) => {
                if (err) {return res.status(500).send("Connection Error");

                }
                return res.status(200).send(result);
            });
        };
    });
};

export const getRouteById=(req, res) => {
    const rid=req.params.id;
    pool.getConnection((err, connection) => {
        if (err) { return res.status(500).send("Connection Error");};

        connection.query('SELECT Route_ID, Source, Destination, Est_Duration FROM Routes WHERE Route_ID = ?',[rid],(error, results) => {
            connection.release();
            if (error) {return res.status(500).send("Connection Error");}
            else{
                if (results.length>0){res.status(200).send(results[0])}
                else{res.status(404).send('ID Not Found')}

            }
        })
    })


}
export const deleteRoute = (req, res) => {
    const routeId = req.params.id;

    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).json({ message: 'Server error: Could not acquire connection.' });
        }
        connection.query('DELETE FROM Routes WHERE Route_ID = ?', [routeId], (error, result) => {
            connection.release();

            if (error) {
                return res.status(500).json({ message: 'Database error.' });
            }

            if (result.affectedRows === 0) {
                res.status(404).json({ message: `Route with ID ${routeId} not found.` });
            } else {
                res.status(200).json({ message: `Route ID ${routeId} successfully deleted.` });
            }
        });
    });
};
