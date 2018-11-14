import React from 'react'
import { 
  Button,
  Icon,
  Label,
  Segment
} from 'semantic-ui-react'

const Semantics = () => {
  return (
    <div style={{display: 'flex', flexFlow: 'column wrap', justifyContent: 'center'}}>

      {/* Basic Button */}
      <div style={{padding: '5px'}}>
        <Button>Button</Button>
        {/* Shorthand Button */}
        <Button content={'Shorthand Button'}/>
      </div>

      {/* Emphasis Button */}
      <div style={{padding: '5px'}}>
        <Button primary>Emphasis</Button>
        {/* Emphasis shorthand Button */}
        <Button secondary content={'Shorthand Emphasis'}/>
      </div>
      
      {/* Animated Button : default horizontal */}
      <div style={{padding: '5px'}}>
        <Button animated>
          <Button.Content visible>Horizontal</Button.Content>
          <Button.Content hidden>
            <Icon name='shop' />
          </Button.Content>
        </Button>
        <Button animated='vertical'>
          <Button.Content visible>Vertical</Button.Content>
          <Button.Content hidden>
            <Icon name='shop' />
          </Button.Content>
        </Button>
        <Button animated='fade'>
          <Button.Content visible>Fade</Button.Content>
          <Button.Content hidden>
            <Icon name='shop' />
          </Button.Content>
        </Button>
      </div>

      {/* Labeled Button */}
      <div style={{padding: '5px'}}>
        <Button as='div' labelPosition='right'>
          <Button icon>
            <Icon name='heart' />
            &nbsp;Label
          </Button>
          <Label as='a' basic pointing='left'>
            2,048
          </Label>
        </Button>
        <Button icon='fork' content='Label' label={{ as: 'a', basic: true, content: '2,048' }} labelPosition='left' /> 

        {/* Label colored button */}
        <Button as='div' labelPosition='right'>
          <Button color='red'>
            <Icon name='heart' />
            Like
          </Button>
          <Label as='a' basic color='red' pointing='left'>
            2,048
          </Label>
        </Button>
        <Button
          basic
          color='blue'
          content='Fork'
          icon='fork'
          label={{ as: 'a', basic: true, color: 'blue', pointing: 'left', content: '2,048' }}
        />
      </div>

      {/* Button Icon */}
      <div style={{padding: '5px'}}>
        <Button icon='world' />
        {/* Labeled Button Icon */}
        <Button icon labelPosition='left'>
          <Icon name='pause' />
          Pause
        </Button>
      </div>

      {/* Button colored */}
      <div style={{padding: '5px'}}>
        <Button content='Standard' />
        <Button color='red' content='Red' />
        <Button color='orange' content='Orange' />
        <Button color='yellow' content='Yellow' />
        <Button color='olive' content='Olive' />
        <Button color='green' content='Green' />
        <Button color='teal' content='Teal' />
        <Button color='blue' content='Blue' />
        <Button color='violet' content='Violet' />
        <Button color='purple' content='Purple' />
        <Button color='pink' content='Pink' />
        <Button color='brown' content='Brown' />
        <Button color='grey' content='Grey' />
        <Button color='black' content='Black' />
      </div>

      {/* Button basic colored */}
      <div style={{padding: '5px'}}>
        <Button content='Standard' basic />
        <Button basic color='red' content='Red' />
        <Button basic color='orange' content='Orange' />
        <Button basic color='yellow' content='Yellow' />
        <Button basic color='olive' content='Olive' />
        <Button basic color='green' content='Green' />
        <Button basic color='teal' content='Teal' />
        <Button basic color='blue' content='Blue' />
        <Button basic color='violet' content='Violet' />
        <Button basic color='purple' content='Purple' />
        <Button basic color='pink' content='Pink' />
        <Button basic color='brown' content='Brown' />
        <Button basic color='grey' content='Grey' />
        <Button basic color='black' content='Black' />
      </div>

      {/* Button inverted : should be placed on dark background */}
      <div style={{backgroundColor: '#000', padding: '5px'}}>
        <Button inverted content='Standard' />
        <Button inverted color='red' content='Red' />
        <Button inverted color='orange' content='Orange' />
        <Button inverted color='yellow' content='Yellow' />
        <Button inverted color='olive' content='Olive' />
        <Button inverted color='green' content='Green' />
        <Button inverted color='teal' content='Teal' />
        <Button inverted color='blue' content='Blue' />
        <Button inverted color='violet' content='Violet' />
        <Button inverted color='purple' content='Purple' />
        <Button inverted color='pink' content='Pink' />
        <Button inverted color='brown' content='Brown' />
        <Button inverted color='grey' content='Grey' />
        <Button inverted color='black' content='Black' />
      </div>

      {/* Button inverted : should be placed on dark background */}
      <div style={{backgroundColor: '#000', padding: '5px'}}>
        <Button basic inverted content='Standard' />
        <Button basic inverted color='red' content='Red' />
        <Button basic inverted color='orange' content='Orange' />
        <Button basic inverted color='yellow' content='Yellow' />
        <Button basic inverted color='olive' content='Olive' />
        <Button basic inverted color='green' content='Green' />
        <Button basic inverted color='teal' content='Teal' />
        <Button basic inverted color='blue' content='Blue' />
        <Button basic inverted color='violet' content='Violet' />
        <Button basic inverted color='purple' content='Purple' />
        <Button basic inverted color='pink' content='Pink' />
        <Button basic inverted color='brown' content='Brown' />
        <Button basic inverted color='grey' content='Grey' />
        <Button basic inverted color='black' content='Black' />
      </div>

      {/* Button Group */}
      <div style={{padding: '5px'}}>
        <Button.Group>
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </Button.Group>{' '}
        <Button.Group buttons={['One', 'Two', 'Three']}/>
      </div>

      {/* Button Icon group */}
      <div style={{padding: '5px'}}>
        <Button.Group>
          <Button icon>
            <Icon name='align left' />
          </Button>
          <Button icon>
            <Icon name='align center' />
          </Button>
          <Button icon>
            <Icon name='align right' />
          </Button>
          <Button icon>
            <Icon name='align justify' />
          </Button>
        </Button.Group>{' '}
        <Button.Group buttons={[ 
          { key: 'bold', icon: 'bold' },
          { key: 'underline', icon: 'underline' },
          { key: 'text width', icon: 'text width' },
        ]}/>
      </div>

      {/* Conditional button, use Button.Group and Button.or in the middle */}
      <div style={{padding: '5px'}}>
        <Button.Group>
          <Button>Cancel</Button>
          <Button.Or />
          <Button positive>Save</Button>
        </Button.Group>
      </div>

      {/* Active, Disabled and Loading, active present that button is clicked */}
      <div style={{padding: '5px'}}>
        <Button active>Active</Button>
        <Button disabled>disabled</Button>
        <Button loading primary>Loading</Button>
      </div>

      {/* Button color of variant */}
      <div style={{padding: '5px'}}>
        <Button color='facebook'>
          <Icon name='facebook' /> Facebook
        </Button>
        <Button color='twitter'>
          <Icon name='twitter' /> Twitter
        </Button>
        <Button color='google plus'>
          <Icon name='google plus' /> Google Plus
        </Button>
        <Button color='vk'>
          <Icon name='vk' /> VK
        </Button>
        <Button color='linkedin'>
          <Icon name='linkedin' /> LinkedIn
        </Button>
        <Button color='instagram'>
          <Icon name='instagram' /> Instagram
        </Button>
        <Button color='youtube'>
          <Icon name='youtube' /> YouTube
        </Button>
      </div>

      {/* Button Size */}
      <div style={{padding: '5px'}}>
        <Button size='mini'>Mini</Button>
        <Button size='tiny'>Tiny</Button>
        <Button size='small'>Small</Button>
        <Button size='medium'>Medium</Button>
        <Button size='large'>Large</Button>
        <Button size='big'>Big</Button>
        <Button size='huge'>Huge</Button>
        <Button size='massive'>Massive</Button>
      </div>

      {/* Compact to shrink the button height */}
      <div style={{padding: '5px'}}>
        <Button compact>Compact</Button>
      </div>

      {/* Button can be toggle to positive when active is true or negative */}
      <div style={{padding: '5px'}}>
        <Button toggle active={true} onClick={() => {}}>Toggle</Button>
        <Button negative={true} onClick={() => {}}>Negative Button</Button>
      </div>

      {/* Button fluid to fits to its container */}
      <div style={{padding: '5px'}}>
        <Button fluid>Fits to Container</Button>
      </div>

      {/* Circular Button to create circle button */}
      <div style={{padding: '5px'}}>
        <Button circular color='facebook' icon='facebook' />
        <Button circular color='twitter' icon='twitter' />
        <Button circular color='linkedin' icon='linkedin' />
        <Button circular color='google plus' icon='google plus' />
      </div>


      {/* Floated */}
      <div style={{padding: '5px'}}>
        <Button color='red' floated='right'>Right Floated</Button>
        <Button floated='left'>Left Floated</Button>
      </div>

      {/* Vertically attached Button */}
      <div style={{padding: '5px'}}>
        <Button attached='top'>Attached to top</Button>
        <Segment attached>
          <img style={{maxWidth: '100%'}} src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
        </Segment>
        <Button.Group attached='bottom'>
          <Button>Attached</Button>
          <Button>To</Button>
          <Button>Bottom</Button>
        </Button.Group>
      </div>

      {/* Horizontaly attached Button */}
      <div style={{padding: '5px'}}>
        <Button attached='left'>Left</Button>
        <Button attached='right'>Right</Button>
      </div>

      {/*  */}
      <div style={{padding: '5px'}}>
      </div>

      {/*  */}
      <div style={{padding: '5px'}}>
      </div>

      {/*  */}
      <div style={{padding: '5px'}}>
      </div>
    </div>
  )
}

export default Semantics