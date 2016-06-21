import test from 'tape'
import { shallow } from 'enzyme'
import React from 'react'
import Hello from './Hello'

test('Hello Component greets Someone', t => {
	const wrapper = shallow(<Hello name="Someone" />)

	t.equals('Hello, Someone!', wrapper.text())

	t.end()
})
