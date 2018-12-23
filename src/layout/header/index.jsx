import React, { Component } from 'react';
import BaseIcon from '@/components/baseIcon'
import LoadTip from '@/components/loadTip'
import classNames from 'classnames'
import styles from './index.module'
import { closeExpand, openExpand } from './store/actionCreators'
import { CSSTransition } from 'react-transition-group'
import { connect } from 'react-redux'
import { fetchSearchHot } from '@/api/header'
const SIZE = 10
const mapStateToProps = (state) => ({ ...state.header })
const mapDispatchToProps = (dispatch) => {
  return {
    onFocus: () => {
      dispatch(openExpand(true))
    },
    onBlur() {
      dispatch(closeExpand(false))
    },
    // getHotSearchList() {
    //   dispatch(getHotSearch())
    // }
  }
}
@connect(mapStateToProps, mapDispatchToProps)
class Header extends Component {
  state = {
    searchHotList: [],
    isRotate: false,
    number: 0,
    mouseIn: false,
    hotLoading: false,
    totalPage: 0,
    currentPage: 1
  }
  focusClasses = {
    enter: styles.changeEnter,
    enterActive: styles.changeEnterActive,
    enterDone: styles.changeEnterDone,
    exit: styles.changeExit,
    exitActive: styles.changeExitActive,
    exitDone: styles.changeExitDone
  }
  componentDidMount() {
    // this.props.getHotSearchList()
    this.getSearchHotList()
  }
  getSearchHotList = () => {
    this.setState({ hotLoading: true })
    fetchSearchHot().then(res => {
      const { list } = res
      const totalPage = Math.ceil(list.length / SIZE)
      let number
      if (list.length < SIZE) {
        number = list.length
      } else {
        number = SIZE
      }
      this.setState({ searchHotList: list, number, hotLoading: false, totalPage })
    })
  }
  // 换一批
  changeList = () => {
    const { searchHotList } = this.state
    let { number } = this.state
    // 计算换一批之后的列表展示
    if (number < searchHotList.length && number + SIZE > searchHotList.length) {
      number = searchHotList.length
    } else if (number === searchHotList.length) {
      number = SIZE
    } else {
      number = number + SIZE
    }
    this.setState({ isRotate: !this.state.isRotate, number })
  }
  hotSearchHtml = () => {
    const { searchHotList, number } = this.state
    // if语句和for循环在javascript中不是表达式，因此它们不能直接在jsx中使用，
    // 但是你可以将它们放在周围的代码中
    // null，布尔值，undefined会被忽略
    return searchHotList.map((list, i) => {
      // 这里当条件不满足的情况下会返回undefined，
      // 布尔值、Null和Undefined被忽略，所以不符合情况下返回undefined被忽略
      if (i < number && i >= number - SIZE) {
        return (
          <div key={i} className={styles.switchItem}>
            {list}
          </div>
        )
      }
    })
  }
  // 优化：其实换一批在这里相当于一个前端分页
  changeList2 = () => {
    // const { searchHotList } = this.state
    let { currentPage, totalPage, isRotate } = this.state
    currentPage++
    if (currentPage > totalPage) {
      currentPage = 1
    }
    this.setState({ isRotate: !isRotate, currentPage })
  }
  hotSearchHtml2 = () => {
    const { currentPage, searchHotList } = this.state
    const html = []
    for (let i = (currentPage - 1) * SIZE; i < currentPage * SIZE; i++) {
      if (searchHotList[i]) {
        html.push(<div key={i} className={styles.switchItem}>{searchHotList[i]}</div>)
      }
    }
    return html
  }

  onMouseLeave = () => {
    this.setState({ mouseIn: false })
  }
  onMouseEnter = () => {
    this.setState({ mouseIn: true })
  }
  render() {
    const { expand, onFocus, onBlur } = this.props
    const { isRotate, mouseIn, hotLoading } = this.state
    // console.log('hotlist', this.props.searchHotList)
    return (
      <div className={styles.header}>
        <div className={styles.logoWrapper}>
          <img className={styles.logo} src={require('images/logo.png')} alt="" />
        </div>
        <div className={styles.headerNav}>
          <div className={styles.left}>
            <div className={classNames(styles.navItem, styles.active)}>首页</div>
            <div className={styles.navItem}>下载App</div>
            <CSSTransition
              in={expand}
              timeout={300}
              classNames={this.focusClasses}
            >
              <div className={styles.inputBox}>
                <input
                  className={styles.input}
                  type="text"
                  placeholder="搜索"
                  onFocus={onFocus}
                  onBlur={onBlur}
                />
                <div className={styles.searchWrapper}>
                  <BaseIcon className={styles.searchIcon} name="search" />
                </div>
                {(expand || mouseIn) &&
                  <div
                    className={styles.switch}
                    onMouseEnter={this.onMouseEnter}
                    onMouseLeave={this.onMouseLeave}
                  >
                    <div className={styles.triangle}></div>
                    <div className={styles.switchTitle}>
                      <h3>热门搜索</h3>
                      <span className={styles.switchIcon} onClick={this.changeList2}>
                        <CSSTransition
                          in={isRotate}
                          timeout={1000}
                          classNames={{
                            enter: styles.scaleEnter,
                            enterActive: styles.scaleEnterActive,
                            enterDone: styles.scaleEnterDone,
                            exit: styles.scaleExit,
                            exitActive: styles.scaleExitActive,
                            exitDone: styles.scaleExitDone,
                          }}
                        >
                          <BaseIcon name="circle" />
                        </CSSTransition>
                        换一批
                      </span>
                    </div>
                    <div className={styles.switchContent}>
                      {
                        hotLoading ?
                          <LoadTip />
                          :
                          this.hotSearchHtml2()
                      }
                    </div>
                  </div>
                }
              </div>
            </CSSTransition>
          </div>
          <div className={styles.right}>
            <div className={styles.navItem}>
              <BaseIcon name="Aa" />
            </div>
            <div className={styles.navItem}>登录</div>
          </div>
        </div>
        <div className={styles.personal}>
          <p className={styles.register}>注册</p>
          <p className={styles.write}>
            <BaseIcon name="pen" />写文章
          </p>
        </div>
      </div>
    );
  }
}
export default Header;

// 通过function来实现无状态组件，但是不能使用修饰器来进行代码简化
// const Header = ({ expand, onBlur, onFocus }) => {
//   return (
//     <div className={styles.header}>
//       <img className={styles.logo} src={require('images/logo.png')} alt="" />
//       <div className={styles.headerNav}>
//         <div className={styles.left}>
//           <div className={classNames(styles.navItem, styles.active)}>首页</div>
//           <div className={styles.navItem}>下载App</div>
//           <CSSTransition
//             in={expand}
//             timeout={300}
//             classNames={{
//               enter: styles.changeEnter,
//               enterActive: styles.changeEnterActive,
//               enterDone: styles.changeEnterDone,
//               exit: styles.changeExit,
//               exitActive: styles.changeExitActive,
//               exitDone: styles.changeExitDone
//             }}
//           >
//             <div className={styles.inputBox}>
//               <input
//                 className={styles.input}
//                 type="text"
//                 placeholder="搜索"
//                 onFocus={onFocus}
//                 onBlur={onBlur}
//               />
//               <div className={styles.searchWrapper}>
//                 <BaseIcon className={styles.searchIcon} name="search" />
//               </div>
//             </div>
//           </CSSTransition>
//         </div>
//         <div className={styles.right}>
//           <div className={styles.navItem}>
//             <BaseIcon name="Aa" />
//           </div>
//           <div className={styles.navItem}>登录</div>
//         </div>
//       </div>
//       <div className={styles.personal}>
//         <p className={styles.register}>注册</p>
//         <p className={styles.write}>
//           <BaseIcon name="pen" />写文章
//           </p>
//       </div>
//     </div>
//   )
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Header)
