# Contributing 
Welcome and thank you for wanting to contribute, I ask that you be kind and considerate of one another and assume good intent.


One of the major goals behind this extension is to actually avoid handling RTL ourselves and lean on the web browsers themselves.
The teams behind web browsers have done a huge amount of work towards making LTR and RTL work well and we shouldn't reinvent the wheel. 
This extension is at the moment relying completely relying on `dir: auto` and letting the web browser handle it and (soon) on `text-align: start`,
these automatically cover the right behavior for LTR and RTL without us having to do anything on our side. This requires using very modern browser versions,
but we're fine with that because reinventing the wheel would definitely not work as well as the years of work behind web browsers.
