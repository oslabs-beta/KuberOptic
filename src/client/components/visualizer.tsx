import React, { useRef, useEffect} from 'react';
import * as d3 from 'd3';

interface IProps {
    data?: number[];
}

const visualizer = (props: IProps) => {
   /* The useRef Hook creates a variable that "holds on" to a value across rendering
       passes. In this case it will hold our component's SVG DOM element. It's
       initialized null and React will assign it later (see the return statement) */
       const d3Container = useRef(null);  

       /* The useEffect Hook is for running side effects outside of React,
       for instance inserting elements into the DOM using D3 */

       useEffect(
           () => {
               if (props.data && d4Container.current) {
                const svg = d3.select(d3Container.current);
                // bind the D3 data
                const update = svg
                .append('g')
                .selectAll('text')
                .data(props.data)

                // enter new d3 elements
                update.enter()
                .append('text')
                .attr('x', (d, i) => i * 25)
                .attr('y', 40)
                .style('font-size', 24)
                .text((id: number) => d);

                // update existing D3 elements
                update
                .attr('x', (d,i) => i * 40)
                .text((d: number) => d);

                // remove old D3 elements

                update.exit()
                .remove();
               }
           },

               /*
            useEffect has a dependency array (below). It's a list of dependency
            variables for this useEffect block. The block will run after mount
            and whenever any of these variables change. We still have to check
            if the variables are valid, but we do not have to compare old props
            to next props to decide whether to rerender.
        */
        [props.data, d3Container.current])
        
        return(
            <svg className="d3-component"
            width={400}
            height={200}
            ref={d3Container}
            />
        );
}

export default visualizer;