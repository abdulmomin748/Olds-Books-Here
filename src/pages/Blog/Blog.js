import React from 'react';
import { Fragment, useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
const Blog = () => {
    const [open, setOpen] = useState(1);
    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };
    return (
        <section className="md:pt-20 pt-16 accordion min-h-[80vh] px-5 lg:px-4 flex justify-center flex-col max-w-[730px] m-auto text-center">
            <h1 className="text-4xl text-center font-bold uppercase mb-16">
                Questions
            </h1>
            <div className='pt-8 pb-16 text-left '>
                <Fragment>
                    <Accordion open={open === 1}>
                        <AccordionHeader className='' onClick={() => handleOpen(1)}>
                            What are the different ways to manage a state in a React application?
                        </AccordionHeader>
                        <AccordionBody className='text-[18px] font-medium custom-accordion'>
                        Local state is perhaps the easiest kind of state to manage in React, considering there are so many tools built into the core React library for managing it. useState is the first tool you should reach for to manage state in your components. It can take accept any valid data value, including primitive and object values.
                        </AccordionBody>
                    </Accordion>    
                    <Accordion open={open === 2}>
                        <AccordionHeader className='text-left' onClick={() => handleOpen(2)}>
                        How does prototypical inheritance work?
                        </AccordionHeader>
                        <AccordionBody className='text-[18px]  font-medium '>
                            The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the [[Prototype]] of an object, we use Object. getPrototypeOf and Object.
                        </AccordionBody>
                    </Accordion>
                    <Accordion open={open === 3}>
                        <AccordionHeader className='' onClick={() => handleOpen(3)}>
                            What is a unit test? Why should we write unit tests?
                        </AccordionHeader>
                        <AccordionBody className='text-[18px]  h-32 font-medium '>
                            The main objective of unit testing is to isolate written code to test and determine if it works as intended. Unit testing is an important step in the development process, because if done correctly, it can help detect early flaws in code which may be more difficult to find in later testing stages.
                        </AccordionBody>
                    </Accordion>
                    <Accordion open={open === 4}>
                        <AccordionHeader className='' onClick={() => handleOpen(4)}>
                            React vs. Angular vs. Vue?
                        </AccordionHeader>
                        <AccordionBody className='text-[18px]  h-32 font-medium '>
                            Both - Angular JS and React JS frameworks are used to create web interfaces for front end development. Angular is Google's matured and advanced JavaScript framework based on TypeScript, whereas Vue is a progressive open-source front-end JavaScript framework created by Evan You.
                        </AccordionBody>
                    </Accordion>
                </Fragment>
            </div>
        </section>
    );
};

export default Blog;